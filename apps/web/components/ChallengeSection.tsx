import { ChevronRight, Dumbbell, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useChallengeStats } from '@/hooks/useChallengeStats';

interface ChallengeSectionProps {
    onOpenPushUpChallenge: (todayAttempts: number) => void;
}

export function ChallengeSection({ onOpenPushUpChallenge }: ChallengeSectionProps) {
    const [todayAttempts, setTodayAttempts] = useState(0);
    const [loading, setLoading] = useState(true);
    const { participantCount } = useChallengeStats();

    useEffect(() => {
        // Fetch today's attempt count
        const userId = localStorage.getItem('userId') || 'guest';
        setLoading(true);
        fetch(`/api/challenge/history?userId=${encodeURIComponent(userId)}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTodayAttempts(data.length);
                }
            })
            .catch(err => console.error("Failed to fetch attempts", err))
            .finally(() => setLoading(false));
    }, []);

    const attemptsLeft = 2 - todayAttempts;

    return (
        <div className="flex-1 overflow-y-auto px-6 pb-28 no-scrollbar">
            <h2 className="text-2xl font-black text-[#192126] mb-6 mt-4">Challenges</h2>

            <div
                onClick={() => !loading && onOpenPushUpChallenge(todayAttempts)}
                className={`bg-[#192126] rounded-3xl p-6 text-white relative overflow-hidden transition-transform cursor-pointer shadow-lg shadow-gray-200 ${loading ? 'opacity-80' : 'active:scale-95'}`}
            >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <div className="w-10 h-10 bg-[#BBF246] rounded-full flex items-center justify-center text-[#192126] mb-3">
                            <Dumbbell className="w-5 h-5 fill-current" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">Push-up Challenge</h3>
                        <p className="text-gray-400 text-sm">Master your upper body strength</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {/* Fake Avatars */}
                            <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-[#192126]"></div>
                            <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-[#192126]"></div>
                            <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-[#192126]"></div>
                        </div>
                        <span className="text-xs text-[#BBF246] font-bold">
                            {participantCount ? `+${participantCount} joined` : 'Join now'}
                        </span>
                    </div>

                    {/* Attempts Badge with Loading */}
                    {loading ? (
                        <span className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-white/10 text-white border-white/10 flex items-center gap-1.5">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            LOADING...
                        </span>
                    ) : (
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${attemptsLeft <= 0
                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                            : 'bg-white/10 text-white border-white/10'
                            }`}>
                            {attemptsLeft <= 0 ? 'COMPLETED TODAY' : `${attemptsLeft} ATTEMPTS LEFT`}
                        </span>
                    )}
                </div>
            </div>

            {/* Squat Challenge - Updated Visuals */}
            <div className="mt-4 pointer-events-none">
                <div className="bg-[#F8F9FA] border border-gray-200 rounded-3xl p-6 text-[#192126] relative overflow-hidden opacity-60 grayscale">
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-3">
                                <span className="font-bold text-[10px] tracking-wider">SOON</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Squat Challenge</h3>
                            <p className="text-gray-500 text-sm">Build powerful legs</p>
                        </div>
                    </div>
                    {/* Diagonal stripes pattern for 'coming soon' vibe */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
                </div>
            </div>

        </div>
    );
}
