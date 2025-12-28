import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';

interface Step7ActivityProps {
    activityLevel: string;
    setActivityLevel: (a: string) => void;
    onNext: () => void;
    onBack: () => void;
}

const ACTIVITIES = [
    { level: 'Sedentary', desc: 'Little or no exercise', icon: '🪑' },
    { level: 'Lightly Active', desc: 'Exercise 1-3 times/week', icon: '🚶' },
    { level: 'Active', desc: 'Exercise 3-5 times/week', icon: '🏃' },
    { level: 'Very Active', desc: 'Hard exercise 6-7 days/week', icon: '🔥' },
];

export function Step7Activity({ activityLevel, setActivityLevel, onNext, onBack }: Step7ActivityProps) {

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full bg-[#1F2937] hover:bg-[#374151]">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <span className="mx-auto text-lg font-medium">Activity</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-green-500 rounded-full"></div>
                ))}
                <div className="h-1 flex-1 bg-gray-700 rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto"
            >
                <h1 className="text-2xl font-bold mb-2">Your daily rhythm.</h1>
                <p className="text-gray-400 mb-8">How active are you right now?</p>

                <div className="space-y-4">
                    {ACTIVITIES.map((act) => (
                        <motion.button
                            key={act.level}
                            onClick={() => setActivityLevel(act.level)}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center p-5 rounded-2xl border transition-all text-left relative overflow-hidden group ${activityLevel === act.level
                                ? 'bg-[#1e293b] border-[#3B82F6] shadow-lg shadow-blue-900/20'
                                : 'bg-[#111827] border-gray-800 hover:bg-[#1a2234]'
                                }`}
                        >
                            <span className="text-3xl mr-4">{act.icon}</span>
                            <div className="flex-1 z-10">
                                <h3 className={`font-semibold text-lg ${activityLevel === act.level ? 'text-white' : 'text-gray-200'}`}>
                                    {act.level}
                                </h3>
                                <p className="text-sm text-gray-400">{act.desc}</p>
                            </div>

                            {/* Animated Selection Circle */}
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${activityLevel === act.level ? 'border-[#3B82F6] bg-[#3B82F6]' : 'border-gray-600'
                                }`}>
                                {activityLevel === act.level && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>

                            {/* Background Burst Effect on Select */}
                            {activityLevel === act.level && (
                                <motion.div
                                    layoutId="burst"
                                    className="absolute inset-0 bg-[#3B82F6]/5 z-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

            </motion.div>

            <div className="mt-4">
                <Button onClick={onNext} disabled={!activityLevel}>
                    Next
                </Button>
            </div>
        </div>
    );
}
