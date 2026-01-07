import { ArrowLeft, Play, Info, Users, Clock, History, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useChallengeStats } from '@/hooks/useChallengeStats';
import { PushUpCounter } from './PushUpCounter';
import { useState, useEffect } from 'react';

interface PushUpChallengeProps {
    onBack: () => void;
    onRefreshPoints?: () => void;
}

interface Attempt {
    id: number;
    status: 'pending' | 'approved' | 'rejected';
    repCount: number;
    createdAt: string;
}

export function PushUpChallenge({ onBack, onRefreshPoints }: PushUpChallengeProps) {
    const { participantCount, joinChallenge } = useChallengeStats();
    const [isRecording, setIsRecording] = useState(false);
    const [view, setView] = useState<'instructions' | 'history' | 'report'>('instructions');
    const [history, setHistory] = useState<Attempt[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastResult, setLastResult] = useState<{ count: number; points: number } | null>(null);

    const fetchHistory = (isManual = false) => {
        if (isManual) setLoading(true);
        const userId = localStorage.getItem('userId') || 'guest';

        fetch(`/api/challenge/history?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setHistory(data);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setLoading(false);
            });
    };

    // Fetch on mount to update limit button text
    useEffect(() => {
        fetchHistory(false);
    }, []);

    // Re-fetch when view changes to history
    useEffect(() => {
        if (view === 'history') {
            fetchHistory(true);
        }
    }, [view]);

    const handleJoin = () => {
        joinChallenge();
        setIsRecording(true);
    };

    if (isRecording) {
        return (
            <PushUpCounter
                onClose={() => setIsRecording(false)}
                onComplete={async (count) => {
                    // 1. Close Camera Immediately
                    setIsRecording(false);
                    console.log("Pushups completed:", count);

                    // 2. Prepare Report Data
                    const points = count * 2.5;
                    setLastResult({ count, points });
                    setView('report'); // Show report screen

                    // 3. Save to Backend in Background
                    let userId = localStorage.getItem('userId');
                    if (!userId) {
                        userId = 'guest-' + Date.now();
                        localStorage.setItem('userId', userId);
                    }

                    try {
                        await fetch('/api/challenge/attempt', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId, repCount: count })
                        });
                        fetchHistory(true);
                        // Refresh global points
                        if (onRefreshPoints) onRefreshPoints();
                    } catch (e) {
                        console.error("Failed to save attempt", e);
                    }
                }}
            />
        );
    }

    // New Report View
    if (view === 'report' && lastResult) {
        return (
            <div className="fixed inset-0 bg-[#192126] z-[60] text-white flex flex-col animate-in fade-in duration-300 items-center justify-center p-6">
                <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#BBF246]/20 blur-3xl rounded-full pointer-events-none"></div>

                    <h2 className="text-3xl font-black mb-1 relative z-10">Good Job!</h2>
                    <p className="text-gray-400 mb-8 relative z-10">Challenge Completed</p>

                    <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                        <div className="bg-[#192126] p-4 rounded-2xl border border-white/5">
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Push-Ups</p>
                            <p className="text-4xl font-black text-white">{lastResult.count}</p>
                        </div>
                        <div className="bg-[#192126] p-4 rounded-2xl border border-white/5">
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">FitCoins</p>
                            <p className="text-4xl font-black text-[#BBF246]">{lastResult.points}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setView('instructions');
                            setLastResult(null);
                        }}
                        className="w-full py-4 rounded-xl bg-[#BBF246] text-[#192126] font-black text-lg hover:bg-[#a6d93b] active:scale-[0.98] transition-all relative z-10"
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-[#192126] z-[60] text-white flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => setView('instructions')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${view === 'instructions' ? 'bg-[#BBF246] text-[#192126]' : 'bg-white/5 text-gray-400'}`}
                    >
                        INSTRUCTIONS
                    </button>
                    <button
                        onClick={() => setView('history')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${view === 'history' ? 'bg-[#BBF246] text-[#192126]' : 'bg-white/5 text-gray-400'}`}
                    >
                        MY HISTORY
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 flex flex-col overflow-y-auto">
                {view === 'instructions' ? (
                    <>


                        <h1 className="text-4xl font-black mb-2">Push-Ups</h1>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="px-2 py-0.5 bg-red-500/20 text-red-500 rounded text-xs font-bold border border-red-500/20 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                1 MINUTE CHALLENGE
                            </div>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            The push-up is a common calisthenics exercise beginning from the prone position. It helps build upper body strength.
                        </p>

                        <div className="space-y-4 mb-auto pb-6">
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/20">
                                    1
                                </div>
                                <p className="font-medium text-sm">Keep your back straight</p>
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/20">
                                    2
                                </div>
                                <p className="font-medium text-sm">Lower body until chest touches floor</p>
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                                <div className="w-10 h-10 rounded-full bg-[#BBF246]/20 text-[#BBF246] flex items-center justify-center border border-[#BBF246]/20">
                                    3
                                </div>
                                <p className="font-medium text-sm">Push back up to starting position</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-4 pb-20">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="w-8 h-8 text-[#BBF246] animate-spin" />
                            </div>
                        ) : history.length === 0 ? (
                            <div className="text-center py-20">
                                <History className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No attempts recorded yet.</p>
                            </div>
                        ) : (
                            history.map(attempt => (
                                <div key={attempt.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{new Date(attempt.createdAt).toLocaleDateString()}</p>
                                        <div className="flex items-center gap-2">
                                            {attempt.status === 'approved' ? (
                                                <div className="text-[#BBF246] font-bold flex items-center gap-1">
                                                    <CheckCircle className="w-4 h-4" />
                                                    {attempt.repCount} Reps
                                                </div>
                                            ) : attempt.status === 'rejected' ? (
                                                <div className="text-red-500 font-bold flex items-center gap-1">
                                                    <XCircle className="w-4 h-4" />
                                                    Rejected
                                                </div>
                                            ) : (
                                                <div className="text-yellow-500 font-bold flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    Pending Review
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-600 font-mono">
                                        #{attempt.id}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Footer Action (Only on instructions tab) */}
            {view === 'instructions' && (
                <div className="p-6 pb-10 bg-gradient-to-t from-[#192126] to-transparent">
                    <button
                        disabled={loading || history.length >= 2}
                        onClick={handleJoin}
                        className={`w-full py-4 rounded-2xl font-black text-lg tracking-wide flex items-center justify-center gap-2 transition-all 
                            ${loading || history.length >= 2
                                ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                                : 'bg-[#BBF246] text-[#192126] hover:bg-[#a6d93b] active:scale-[0.98] shadow-lg shadow-[#BBF246]/20'
                            }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                CHECKING ELIGIBILITY...
                            </>
                        ) : history.length >= 2 ? (
                            'MAX ATTEMPTS REACHED'
                        ) : (
                            `RECORD ATTEMPT (${2 - history.length} LEFT)`
                        )}
                    </button>
                    {participantCount !== null && (
                        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>{participantCount > 0 ? `+${participantCount} joined` : 'Be the first to join!'}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
