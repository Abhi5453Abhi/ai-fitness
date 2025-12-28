import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';

interface StepHabitsProps {
    habits: string[];
    setHabits: (habits: string[]) => void;
    onNext: () => void;
    onBack: () => void;
}

const RECOMMENDED_HABITS = [
    "Eat more protein", "Plan more meals",
    "Meal prep and cook", "Eat more fiber",
    "Move more", "Workout more"
];

const MORE_HABITS = [
    "Track nutrients", "Track calories", "Track macros",
    "Eat mindfully", "Eat a balanced diet",
    "Eat whole foods", "Eat more vegetables",
    "Eat more fruit", "Drink more water",
    "Prioritize sleep", "Something else", "I'm not sure"
];

export function StepHabits({ habits, setHabits, onNext, onBack }: StepHabitsProps) {

    const toggleHabit = (habit: string) => {
        if (habits.includes(habit)) {
            setHabits(habits.filter(h => h !== habit));
        } else {
            setHabits([...habits, habit]);
        }
    };

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full bg-[#1F2937] hover:bg-[#374151]">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <span className="mx-auto text-lg font-medium">Goals</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-8">
                {/* Progress Bar - Step 8 of 12 (roughly) */}
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-gray-700 rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto pb-4 custom-scrollbar"
            >
                <h1 className="text-2xl font-bold mb-6">
                    Which healthy habits are most important to you?
                </h1>

                <div className="mb-6">
                    <h3 className="text-gray-400 text-sm mb-3">Recommended for you</h3>
                    <div className="flex flex-wrap gap-2">
                        {RECOMMENDED_HABITS.map(habit => (
                            <button
                                key={habit}
                                onClick={() => toggleHabit(habit)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${habits.includes(habit)
                                        ? 'bg-[#1e293b] border-[#3B82F6] text-white'
                                        : 'bg-[#1F2937] border-transparent text-gray-300 hover:bg-[#374151]'
                                    }`}
                            >
                                {habit}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-gray-400 text-sm mb-3">More healthy habits</h3>
                    <div className="flex flex-wrap gap-2">
                        {MORE_HABITS.map(habit => (
                            <button
                                key={habit}
                                onClick={() => toggleHabit(habit)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${habits.includes(habit)
                                        ? 'bg-[#1e293b] border-[#3B82F6] text-white'
                                        : 'bg-[#1F2937] border-transparent text-gray-300 hover:bg-[#374151]'
                                    }`}
                            >
                                {habit}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="mt-4">
                <Button onClick={onNext}>
                    Next
                </Button>
            </div>
        </div>
    );
}
