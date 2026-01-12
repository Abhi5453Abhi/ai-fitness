import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, Leaf, Beef, Egg, CandyOff } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface StepDietTypeProps {
    dietType: string;
    setDietType: (type: string) => void;
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
}

const DIET_TYPES = [
    { id: 'vegetarian', key: 'diet_vegetarian', descKey: 'diet_vegetarian_desc', icon: <Leaf className="w-5 h-5" /> },
    { id: 'vegan', key: 'diet_vegan', descKey: 'diet_vegan_desc', icon: <CandyOff className="w-5 h-5" /> }
];

export function StepDietType({ dietType, setDietType, onNext, onBack, onSkip }: StepDietTypeProps) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full p-6 bg-white text-[#192126] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#192126]" />
                </button>
                <span className="mx-auto text-lg font-bold">{t.step_diet_title}</span>
                <div className="w-10"></div>
            </div>

            {/* Progress Bar - Step 8 of 16 */}
            <div className="flex gap-1 mb-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                ))}
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1"
            >
                <h1 className="text-2xl font-black mb-2 tracking-tight">{t.step_diet_subtitle}</h1>
                <p className="text-[#5E6468] font-medium mb-8">{t.step_diet_desc}</p>

                <div className="space-y-3">
                    {DIET_TYPES.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setDietType(type.id)}
                            className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${dietType === type.id
                                ? 'border-[#192126] bg-[#192126] text-white shadow-lg'
                                : 'border-gray-100 bg-white hover:border-gray-200'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${dietType === type.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                                    {type.icon}
                                </div>
                                <div className="text-left">
                                    <div className="font-bold">{t[type.key]}</div>
                                    <div className={`text-xs ${dietType === type.id ? 'text-gray-300' : 'text-gray-400'}`}>
                                        {t[type.descKey]}
                                    </div>
                                </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${dietType === type.id ? 'border-[#BBF246]' : 'border-gray-200'
                                }`}>
                                {dietType === type.id && <div className="w-3 h-3 bg-[#BBF246] rounded-full" />}
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>

            <div className="mt-4 pt-6 border-t border-gray-100 flex gap-3">
                <button
                    onClick={onSkip}
                    className="flex-1 py-4 rounded-xl font-bold text-[#192126] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    Skip
                </button>
                <div className="flex-[2]">
                    <Button onClick={onNext} disabled={!dietType}>
                        {t.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
