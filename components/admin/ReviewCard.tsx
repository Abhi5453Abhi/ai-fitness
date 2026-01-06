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
        <div className="bg-[#192126] rounded-xl overflow-hidden border border-white/10 flex flex-col md:flex-row h-[80vh] md:h-[600px]">
            {/* Video Section */}
            <div className="w-full md:w-1/2 bg-black relative flex items-center justify-center bg-zinc-900">
                {attempt.videoUrl ? (
                    <video
                        src={attempt.videoUrl}
                        controls
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        <Play className="w-12 h-12 mb-2 opacity-50" />
                        <p>No Video Available</p>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-xs text-gray-400 font-mono mb-1">ID: {attempt.id}</p>
                            <p className="text-lg font-bold text-white mb-1">User: {attempt.userId}</p>
                            <p className="text-xs text-gray-500">{new Date(attempt.createdAt).toLocaleString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${attempt.status === 'approved' ? 'bg-[#BBF246]/20 text-[#BBF246]' :
                            attempt.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                                'bg-yellow-500/20 text-yellow-500'
                            }`}>
                            {attempt.status}
                        </span>
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-2 uppercase font-bold tracking-wider">Verified Rep Count</label>
                        <input
                            type="number"
                            min="0"
                            value={displayReps}
                            onChange={(e) => setReps(e.target.value === '' ? 0 : parseInt(e.target.value))}
                            placeholder="0"
                            disabled={isProcessing}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xl focus:outline-none focus:border-[#BBF246] placeholder-gray-600 disabled:opacity-50 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => handleAction('rejected')}
                            disabled={isProcessing}
                            className="px-4 py-3 bg-red-500/10 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <X className="w-5 h-5" /> Reject
                        </button>

                        <button
                            onClick={() => handleAction('approved')}
                            disabled={isProcessing}
                            className="px-4 py-3 bg-[#BBF246] text-[#192126] rounded-xl font-bold hover:bg-[#a6d93b] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Check className="w-5 h-5" /> Approve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
