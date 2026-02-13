import { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface Withdrawal {
    id: number;
    userId: string;
    points: number;
    amount: number;
    upiId: string;
    status: string;
    requestedAt: string;
}

export function WithdrawalAdminPanel({ withdrawals, onRefresh }: { withdrawals: Withdrawal[], onRefresh: () => void }) {
    const [processing, setProcessing] = useState<number | null>(null);

    const handleApprove = async (id: number) => {
        if (!confirm('Approve this withdrawal? This will trigger instant payout.')) return;
        
        setProcessing(id);
        try {
            const res = await fetch('/api/admin/withdraw/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ withdrawalId: id })
            });
            
            const data = await res.json();
            if (data.success) {
                alert('Payout successful!');
            } else {
                alert(`Payout failed: ${data.error}`);
            }
            onRefresh();
        } catch (error) {
            alert('Error processing payout');
        } finally {
            setProcessing(null);
        }
    };

    const handleReject = async (id: number) => {
        const reason = prompt('Reason for rejection:');
        if (!reason) return;

        setProcessing(id);
        try {
            await fetch('/api/admin/withdraw/reject', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ withdrawalId: id, reason })
            });
            alert('Withdrawal rejected');
            onRefresh();
        } catch (error) {
            alert('Error rejecting withdrawal');
        } finally {
            setProcessing(null);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-500/20 text-yellow-500',
            approved: 'bg-blue-500/20 text-blue-500',
            processing: 'bg-purple-500/20 text-purple-500',
            completed: 'bg-green-500/20 text-green-500',
            failed: 'bg-red-500/20 text-red-500',
            rejected: 'bg-gray-500/20 text-gray-400'
        };
        return styles[status as keyof typeof styles] || 'bg-gray-500/20 text-gray-400';
    };

    return (
        <div className="bg-[#192126] rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold">
                    <tr>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">UPI ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {withdrawals.map(w => (
                        <tr key={w.id}>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusBadge(w.status)}`}>
                                    {w.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-bold">{w.userId}</td>
                            <td className="px-6 py-4">
                                <div>
                                    <p className="font-bold text-[#BBF246]">₹{w.amount}</p>
                                    <p className="text-xs text-gray-400">{w.points} pts</p>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-mono">{w.upiId}</td>
                            <td className="px-6 py-4 text-xs text-gray-400">
                                {new Date(w.requestedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {w.status === 'pending' ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleApprove(w.id)}
                                            disabled={processing === w.id}
                                            className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-700 disabled:opacity-50"
                                        >
                                            {processing === w.id ? 'Processing...' : 'Approve'}
                                        </button>
                                        <button
                                            onClick={() => handleReject(w.id)}
                                            disabled={processing === w.id}
                                            className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-700 disabled:opacity-50"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-xs text-gray-500">No action available</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
