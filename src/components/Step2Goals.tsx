import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';

interface Step2GoalsProps {
    name: string;
    selectedGoals: string[];
    toggleGoal: (goal: string) => void;
    onNext: () => void;
    onBack: () => void;
}

const GOALS = [
    "Lose Weight",
    "Maintain Weight",
    "Gain Weight",
    "Gain Muscle",
    "Modify My Diet",
    "Plan Meals",
    "Manage Stress",
    "Stay Active"
];

export function Step2Goals({ name, selectedGoals, toggleGoal, onNext, onBack }: Step2GoalsProps) {
    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="hidden sm:block p-2 rounded-full bg-[#1F2937] hover:bg-[#374151]">
                    {/* Back button hidden here based on screenshot flow or kept for UX? Screenshot doesn't clearly show it on top but usually present */}
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <span className="mx-auto text-lg font-medium">Goals</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-6">
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-700 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto pb-4"
            >
                <h1 className="text-2xl font-bold mb-2">
                    Hey, {name || 'User'}. 👋 Let's start with your goals.
                </h1>
                <p className="text-gray-400 mb-6 text-sm">
                    Select up to three that are most important to you.
                </p>

                <div className="space-y-3">
                    {GOALS.map((goal) => {
                        const isSelected = selectedGoals.includes(goal);
                        return (
                            <div
                                key={goal}
                                onClick={() => toggleGoal(goal)}
                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${isSelected
                                    ? 'bg-[#1e293b] border-[#3B82F6]'
                                    : 'bg-[#111827] border-transparent hover:bg-[#1a2234]'
                                    }`}
                            >
                                <span className="font-medium text-white">{goal}</span>
                                <div className={`w-6 h-6 rounded border flex items-center justify-center ${isSelected ? 'bg-[#3B82F6] border-[#3B82F6]' : 'border-gray-500'
                                    }`}>
                                    {isSelected && <span className="text-white text-sm">✓</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            <div className="mt-4 flex items-center gap-4">
                <button onClick={onBack} className="p-4 rounded-full bg-[#1F2937] hover:bg-[#374151] transition-colors shrink-0">
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <Button onClick={onNext} disabled={selectedGoals.length === 0}>
                    Next
                </Button>
            </div>
        </div>
    );
}
