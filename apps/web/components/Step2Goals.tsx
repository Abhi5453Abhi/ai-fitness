import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Step2GoalsProps {
    name: string;
    selectedGoals: string[];
    toggleGoal: (goal: string) => void;
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
}

const GOAL_KEYS = [
    'goal_lose_weight',
    'goal_gain_muscle',
    'goal_get_fit',
    'goal_manage_stress',
    'goal_improve_sleep',
    'goal_increase_energy'
];

export function Step2Goals({ name, selectedGoals, toggleGoal, onNext, onBack, onSkip }: Step2GoalsProps) {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col h-full p-6 text-[#192126] bg-white">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#192126]" />
                </button>
                <span className="mx-auto text-lg font-bold">2/10</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-6">
                <div className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                <div className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto pb-4 no-scrollbar"
            >
                <h1 className="text-2xl font-black mb-2 tracking-tight">
                    Hey, {name || 'User'}. 👋 <br />{t.step2_title}
                </h1>
                <p className="text-[#5E6468] font-medium mb-6 text-sm">
                    {t.step2_subtitle}
                </p>

                <div className="space-y-3">
                    {GOAL_KEYS.map((goalKey) => {
                        const isSelected = selectedGoals.includes(goalKey);
                        return (
                            <div
                                key={goalKey}
                                onClick={() => toggleGoal(goalKey)}
                                className={`flex items-center justify-between p-5 rounded-3xl border-2 cursor-pointer transition-all ${isSelected
                                    ? 'bg-[#192126] border-[#192126] shadow-lg scale-[1.02] text-white'
                                    : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-[#192126]'
                                    }`}
                            >
                                <span className="font-bold text-lg">{t[goalKey]}</span>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-[#BBF246]' : 'bg-gray-100'
                                    }`}>
                                    {isSelected && <Check className="w-4 h-4 text-[#192126]" />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 bg-white">
                <button
                    onClick={onSkip}
                    className="flex-1 py-4 rounded-xl font-bold text-[#192126] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    Skip
                </button>
                <div className="flex-[2]">
                    <Button onClick={onNext} disabled={selectedGoals.length === 0}>
                        {t.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
