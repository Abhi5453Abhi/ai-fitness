import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, Sparkles, Brain, Salad, Trophy } from 'lucide-react';

interface Step3MotivationProps {
    selectedGoals: string[];
    onNext: () => void;
    onBack: () => void;
}

export function Step3Motivation({ selectedGoals = [], onNext, onBack }: Step3MotivationProps) {
    const isSynergy = selectedGoals.length > 1;
    const primaryGoal = selectedGoals[0] || "Lose Weight";

    // -----------------------------------------------------------------------
    // RENDERERS
    // -----------------------------------------------------------------------

    const renderSynergyCore = () => (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Connecting Beams */}
                <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]">
                    {selectedGoals.map((_, i) => (
                        <line
                            key={i}
                            x1="50%" y1="50%"
                            x2={`${50 + 40 * Math.cos(i * 2 * Math.PI / selectedGoals.length)}%`}
                            y2={`${50 + 40 * Math.sin(i * 2 * Math.PI / selectedGoals.length)}%`}
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeOpacity="0.5"
                        />
                    ))}
                </svg>

                {/* Central Core */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.5 }}
                    className="w-24 h-24 bg-white rounded-full blur-xl absolute opacity-50"
                />
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-20 h-20 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full z-10 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                >
                    <Sparkles className="w-10 h-10 text-white" />
                </motion.div>

                {/* Orbiting Goals */}
                {selectedGoals.map((goal, i) => {
                    const angle = (i * 2 * Math.PI) / selectedGoals.length;
                    const radius = 100; // px
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <motion.div
                            key={goal}
                            initial={{ opacity: 0, x: 0, y: 0 }}
                            animate={{ opacity: 1, x, y }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="absolute w-12 h-12 bg-[#1e293b] border border-blue-500/50 rounded-full flex items-center justify-center text-[10px] text-center font-bold shadow-lg z-20"
                        >
                            {goal.split(' ')[0]} {/* First word only for space */}
                        </motion.div>
                    )
                })}
            </div>
            <p className="mt-8 text-center text-blue-200/80 max-w-xs">
                Combining <strong>{selectedGoals.length} goals</strong> into one unified protocol.
            </p>
        </div>
    );

    const renderMuscleCurve = () => (
        <div className="relative w-full h-64 bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden">
            {/* Rising Curve */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="muscleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d="M0,220 C100,210 200,180 300,100 S500,50 600,20" fill="url(#muscleGrad)" stroke="none" />
                <path d="M0,220 C100,210 200,180 300,100 S500,50 600,20" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="absolute right-6 top-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-orange-400" />
                </div>
            </div>
            <div className="mt-auto z-10">
                <h3 className="text-2xl font-bold text-white">+2.5kg</h3>
                <p className="text-orange-200/70 text-sm">Lean Mass Projection</p>
            </div>
        </div>
    );

    const renderDietStream = () => (
        <div className="relative w-full h-64 bg-green-900/10 rounded-3xl border border-green-500/20 p-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Particles Stream */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: -200, y: Math.random() * 200, opacity: 0 }}
                    animate={{ x: 400, opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: Math.random() * 2, ease: "linear" }}
                    className="absolute w-2 h-2 bg-green-400 rounded-full blur-[1px]"
                    style={{ top: Math.random() * 100 + "%" }}
                />
            ))}
            <div className="z-10 bg-[#090E17]/80 backdrop-blur border border-green-500/30 px-6 py-3 rounded-full flex items-center gap-3">
                <Salad className="w-5 h-5 text-green-400" />
                <span className="text-green-100 font-medium">Metabolic Optimization</span>
            </div>
        </div>
    );

    const renderStressWave = () => (
        <div className="relative w-full h-64 bg-indigo-900/10 rounded-3xl border border-indigo-500/20 p-6 flex items-center justify-center overflow-hidden">
            {/* Calm Sine Wave */}
            <svg className="absolute inset-0 w-full h-full">
                <path d="M0,128 Q50,50 100,128 T200,128 T300,128 T400,128" fill="none" stroke="#818CF8" strokeWidth="4" className="drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
            </svg>
            <div className="z-10 flex flex-col items-center">
                <Brain className="w-12 h-12 text-indigo-400 mb-2" />
                <span className="text-indigo-200">Cortisol Regulation</span>
            </div>
        </div>
    );

    const renderStepsStairs = () => (
        <div className="relative w-full h-64 bg-white/5 rounded-3xl border border-white/10 p-6 flex items-end gap-2 justify-center overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: h * 15 + "%" }}
                    transition={{ delay: i * 0.1 }}
                    className="w-8 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-md"
                />
            ))}
            <div className="absolute top-6 left-6 text-cyan-200 font-bold">Activity Volume</div>
        </div>
    );

    const renderWeightLoss = () => (
        <div className="relative w-full h-64 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10 p-6 flex flex-col justify-between mb-8 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path
                    d="M0,50 C50,60 100,120 150,110 S250,140 300,160 S400,200 500,220"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="drop-shadow-lg"
                />
                <path
                    d="M0,30 C50,40 100,100 150,90 S250,120 300,140 S400,180 500,200"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                />
            </svg>
            <div className="absolute left-6 top-12 w-3 h-3 bg-[#1e293b] rounded-full border-2 border-[#3B82F6]"></div>
            <div className="mt-auto flex justify-between text-xs font-semibold text-blue-200/70 z-10 w-full px-1">
                <span>Today</span>
                <span>6 months</span>
            </div>
        </div>
    );

    // -----------------------------------------------------------------------
    // CONTENT SELECTOR
    // -----------------------------------------------------------------------

    let content;
    let title = "Losing weight isn't always easy.";
    let sub = "But we'll motivate you through the ups and downs.";

    if (isSynergy) {
        title = "Ambitious. Complex. Achievable.";
        sub = "Most people pick one path. You've chosen to master multiple. We've built a protocol to harmonize them.";
        content = renderSynergyCore();
    } else {
        // Single Goal Logic
        if (primaryGoal.includes("Muscle") || primaryGoal.includes("Gain Weight")) {
            title = "Building strength takes patience.";
            sub = "We optimize your hypertrophy window so every rep counts.";
            content = renderMuscleCurve();
        } else if (primaryGoal.includes("Diet") || primaryGoal.includes("Meals")) {
            title = "Fueling your engine.";
            sub = "It's not just about less food, it's about better fuel.";
            content = renderDietStream();
        } else if (primaryGoal.includes("Stress") || primaryGoal.includes("Maintain")) {
            title = "Finding your balance.";
            sub = "Sustainable health resets in a calm mind.";
            content = renderStressWave();
        } else if (primaryGoal.includes("Active")) {
            title = "Momentum builds daily.";
            sub = "Small steps compound into massive change.";
            content = renderStepsStairs();
        } else {
            // Default: Lose Weight
            content = renderWeightLoss();
        }
    }


    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-[#3B82F6] via-[#1E40AF] to-[#0B0F19] text-white">
            <div className="p-6 pb-0">
                <div className="flex items-center mb-6">
                    <span className="mx-auto text-lg font-medium opacity-80">Motivation</span>
                </div>
                {/* Progress Bar */}
                <div className="flex gap-1 mb-8">
                    <div className="h-1 flex-1 bg-green-400 rounded-full"></div>
                    <div className="h-1 flex-1 bg-green-400 rounded-full"></div>
                    <div className="h-1 flex-1 bg-green-400 rounded-full"></div>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-1 flex-1 bg-white/20 rounded-full"></div>
                    ))}
                </div>
            </div>

            <motion.div
                key={isSynergy ? 'synergy' : primaryGoal} // Trigger re-animation on change
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 px-6 flex flex-col"
            >
                <h2 className="text-lg font-semibold text-white/90 mb-2">OK, real talk:</h2>
                <h1 className="text-3xl font-extrabold mb-4 leading-tight">
                    {title}
                </h1>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                    {sub}
                </p>

                {/* Dynamic Content Area */}
                <div className="flex-1 relative mb-4">
                    {content}
                </div>

                {!isSynergy && (
                    <p className="text-sm italic text-blue-200/80 mb-6 text-center">
                        P.S. You've already done the hardest part: getting started 🥳
                    </p>
                )}

            </motion.div>

            <div className="p-6 mt-auto flex items-center gap-4 bg-gradient-to-t from-[#0B0F19] to-transparent pt-10">
                <button onClick={onBack} className="p-4 rounded-full bg-[#1F2937]/50 hover:bg-[#374151] backdrop-blur-md transition-colors shrink-0">
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <Button onClick={onNext} className="shadow-xl shadow-blue-900/50">
                    Next
                </Button>
            </div>
        </div>
    );
}
