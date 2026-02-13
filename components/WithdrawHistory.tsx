import { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

interface WithdrawHistoryProps {
    userId: string;
    onClose: () => void;
}

export function WithdrawHistory({ userId, onClose }: WithdrawHistoryProps) {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const res = await fetch(`/api/withdraw/history?userId=${userId}`);
        const data = await res.json();
        setHistory(data);
        setLoading(false);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'failed': 
            case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
            default: return <Clock className="w-5 h-5 text-yellow-600" />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black">Withdrawal History</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                ) : history.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No withdrawals yet</p>
                ) : (
                    <div className="space-y-3">
                        {history.map(w => (
                            <div key={w.id} className="border-2 border-gray-100 rounded-2xl p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            {getStatusIcon(w.status)}
                                            <span className="font-bold capitalize">{w.status}</span>
                                        </div>
                                        <p className="text-2xl font-black">₹{w.amount}</p>
                                        <p className="text-xs text-gray-500">{w.points} points</p>
                                    </div>
                                    <div className="text-right text-xs text-gray-500">
                                        {new Date(w.requestedAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="text-xs bg-gray-50 rounded-xl p-2 mt-2">
                                    <p><span className="font-bold">UPI:</span> {w.upiId}</p>
                                    {w.failureReason && (
                                        <p className="text-red-600 mt-1">
                                            <span className="font-bold">Reason:</span> {w.failureReason}
                                        </p>
                                    )}
                                    {w.rejectionReason && (
                                        <p className="text-red-600 mt-1">
                                            <span className="font-bold">Reason:</span> {w.rejectionReason}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
