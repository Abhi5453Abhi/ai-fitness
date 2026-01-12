import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface StepHabitsProps {
    habits: string[];
    setHabits: (habits: string[]) => void;
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
}

const RECOMMENDED_HABITS_MAP = [
    { id: "Eat more protein", key: "habit_protein" },
    { id: "Plan more meals", key: "habit_meals" },
    { id: "Meal prep and cook", key: "habit_prep" },
    { id: "Eat more fiber", key: "habit_fiber" },
    { id: "Move more", key: "habit_move" },
    { id: "Workout more", key: "habit_workout" }
];

const MORE_HABITS_MAP = [
    { id: "Track nutrients", key: "habit_track_nutrients" },
    { id: "Track calories", key: "habit_track_calories" },
    { id: "Track macros", key: "habit_track_macros" },
    { id: "Eat mindfully", key: "habit_mindfully" },
    { id: "Eat a balanced diet", key: "habit_balanced" },
    { id: "Eat whole foods", key: "habit_whole" },
    { id: "Eat more vegetables", key: "habit_veg" },
    { id: "Eat more fruit", key: "habit_fruit" },
    { id: "Drink more water", key: "habit_water_more" },
    { id: "Prioritize sleep", key: "habit_sleep" },
    { id: "Something else", key: "habit_else" },
    { id: "I'm not sure", key: "habit_unsure" }
];

export function StepHabits({ habits, setHabits, onNext, onBack, onSkip }: StepHabitsProps) {
    const { t } = useLanguage();

    const toggleHabit = (habit: string) => {
        if (habits.includes(habit)) {
            setHabits(habits.filter(h => h !== habit));
        } else {
            setHabits([...habits, habit]);
        }
    };

    return (
        <div className="flex flex-col h-full p-6 bg-white text-[#192126]">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#192126]" />
                </button>
                <span className="mx-auto text-lg font-bold">{t.step_habits_header}</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-8">
                {/* Progress Bar - Step 12 of ~16 */}
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                ))}
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto pb-4 no-scrollbar"
            >
                <h1 className="text-2xl font-black mb-6 tracking-tight">
                    {t.step_habits_title}
                </h1>

                <div className="mb-8">
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4">{t.section_recommended}</h3>
                    <div className="flex flex-wrap gap-2">
                        {RECOMMENDED_HABITS_MAP.map(item => {
                            const isSelected = habits.includes(item.id);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => toggleHabit(item.id)}
                                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all border-2 flex items-center gap-2 ${isSelected
                                        ? 'bg-[#192126] border-[#192126] text-white shadow-lg'
                                        : 'bg-white border-gray-100 text-[#192126] hover:border-gray-300'
                                        }`}
                                >
                                    {t[item.key]}
                                    {isSelected && <Check className="w-4 h-4 text-[#BBF246]" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4">{t.section_more}</h3>
                    <div className="flex flex-wrap gap-2">
                        {MORE_HABITS_MAP.map(item => {
                            const isSelected = habits.includes(item.id);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => toggleHabit(item.id)}
                                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all border-2 flex items-center gap-2 ${isSelected
                                        ? 'bg-[#192126] border-[#192126] text-white shadow-lg'
                                        : 'bg-white border-gray-100 text-[#192126] hover:border-gray-300'
                                        }`}
                                >
                                    {t[item.key]}
                                    {isSelected && <Check className="w-4 h-4 text-[#BBF246]" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            <div className="mt-4 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 font-medium mb-4">
                {t.personalize_note}
            </div>

            <div className="mt-4 pt-6 border-t border-gray-100 flex gap-3">
                <button
                    onClick={onSkip}
                    className="flex-1 py-4 rounded-xl font-bold text-[#192126] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    Skip
                </button>
                <div className="flex-[2]">
                    <Button onClick={onNext}>
                        {t.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
