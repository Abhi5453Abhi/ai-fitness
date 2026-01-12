import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface StepRateProps {
    weeklyRate: string;
    setWeeklyRate: (rate: string) => void;
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
}

const RATES = [
    { key: "rate_02", value: "0.2", recommended: true },
    { key: "rate_05", value: "0.5", recommended: false },
    { key: "rate_08", value: "0.8", recommended: false },
    { key: "rate_10", value: "1.0", recommended: false },
];

export function StepRate({ weeklyRate, setWeeklyRate, onNext, onBack, onSkip }: StepRateProps) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full p-6 bg-white text-[#192126] overflow-y-auto">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full bg-[#1F2937] hover:bg-[#374151]">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <span className="mx-auto text-lg font-medium">{t.step_rate_title}</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-8">
                {/* Progress Bar - Step 7 of 12 (roughly) */}
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
                className="flex-1"
            >
                <h1 className="text-2xl font-bold mb-6">{t.step_rate_subtitle}</h1>

                <div className="space-y-3">
                    {RATES.map((item) => (
                        <div
                            key={item.value}
                            onClick={() => setWeeklyRate(item.value)}
                            className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${weeklyRate === item.value
                                ? 'bg-[#1e293b] border-[#3B82F6]'
                                : 'bg-[#111827] border-transparent hover:bg-[#1a2234]'
                                }`}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-white">{t[item.key]}</span>
                                {item.recommended && (
                                    <span className="text-xs text-gray-400 mt-0.5">{t.recommended}</span>
                                )}
                            </div>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${weeklyRate === item.value ? 'bg-blue-500 border-blue-500' : 'border-gray-600'
                                }`}>
                                {weeklyRate === item.value && <Check className="w-4 h-4 text-white" />}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="mt-auto flex gap-3">
                <button
                    onClick={onSkip}
                    className="flex-1 py-4 rounded-xl font-bold text-[#192126] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    Skip
                </button>
                <div className="flex-[2]">
                    <Button onClick={onNext} disabled={!weeklyRate}>
                        {t.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
