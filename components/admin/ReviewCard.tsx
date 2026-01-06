import { useState, useEffect } from 'react';
import { Check, X, Play } from 'lucide-react';

interface Attempt {
    id: number;
    userId: string;
    videoUrl: string;
    status: 'pending' | 'approved' | 'rejected';
    repCount: number;
    createdAt: string;
}

interface ReviewCardProps {
    attempt: Attempt;
    onReview: (id: number, status: 'approved' | 'rejected', reps: number) => void;
}

export function ReviewCard({ attempt, onReview }: ReviewCardProps) {
    const [reps, setReps] = useState<string | number>(attempt.repCount);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setReps(attempt.repCount);
    }, [attempt.repCount]);

    const displayReps = reps === 0 ? '' : reps;

    const handleAction = (status: 'approved' | 'rejected') => {
        setIsProcessing(true);
        onReview(attempt.id, status, status === 'approved' ? Number(reps) : 0);
    };

    return (
        <div className="bg-[#192126] rounded-xl overflow-hidden border border-white/10 flex flex-col md:flex-row">
            {/* ... previous code ... */}

            {/* Controls */}
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    {/* ... previous code ... */}
                    <div className="flex justify-between items-start mb-2">
                        {/* ... previous code ... */}
                        <div>
                            <p className="text-xs text-gray-400 font-mono">ID: {attempt.id}</p>
                            <p className="text-sm font-bold text-white">User: {attempt.userId}</p>
                            <p className="text-xs text-gray-500">{new Date(attempt.createdAt).toLocaleString()}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${attempt.status === 'approved' ? 'bg-[#BBF246]/20 text-[#BBF246]' :
                            attempt.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                                'bg-yellow-500/20 text-yellow-500'
                            }`}>
                            {attempt.status}
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex items-end gap-4">
                    <div className="flex-1">
                        <label className="block text-xs text-gray-400 mb-1">Rep Count</label>
                        <input
                            type="number"
                            min="0"
                            value={displayReps}
                            onChange={(e) => setReps(e.target.value === '' ? 0 : parseInt(e.target.value))}
                            placeholder="0"
                            disabled={isProcessing}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#BBF246] placeholder-gray-600 disabled:opacity-50"
                        />
                    </div>

                    <button
                        onClick={() => handleAction('rejected')}
                        disabled={isProcessing}
                        className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg font-bold hover:bg-red-500/20 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X className="w-4 h-4" /> Reject
                    </button>

                    <button
                        onClick={() => handleAction('approved')}
                        disabled={isProcessing}
                        className="px-4 py-2 bg-[#BBF246] text-[#192126] rounded-lg font-bold hover:bg-[#a6d93b] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Check className="w-4 h-4" /> Approve
                    </button>
                </div>
            </div>
        </div>
    );
}
