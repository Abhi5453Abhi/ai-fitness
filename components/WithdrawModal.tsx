import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface WithdrawModalProps {
    userId: string;
    maxPoints: number;
    onClose: () => void;
    onSuccess: () => void;
}

export function WithdrawModal({ userId, maxPoints, onClose, onSuccess }: WithdrawModalProps) {
    const [upiId, setUpiId] = useState('');
    const [points, setPoints] = useState(maxPoints);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/withdraw/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, points, upiId })
            });

            const data = await res.json();

            if (data.success) {
                alert('Withdrawal request submitted! You will be notified once approved.');
                onSuccess();
            } else {
                setError(data.error || 'Failed to submit request');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black">Withdraw Money</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Points to Withdraw</label>
                        <select
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-bold"
                        >
                            {Array.from({ length: Math.floor(maxPoints / 1000) }, (_, i) => (i + 1) * 1000).map(p => (
                                <option key={p} value={p}>
                                    {p} points = ₹{(p / 100).toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2">UPI ID</label>
                        <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="yourname@paytm"
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter your UPI ID (e.g., 9876543210@paytm, username@okaxis)
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 flex gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#BBF246] text-[#192126] py-4 rounded-2xl font-bold hover:bg-[#a6d93b] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            </div>
        </div>
    );
}
