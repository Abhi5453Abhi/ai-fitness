import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, Armchair, Footprints, Zap, Flame } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Step7ActivityProps {
    activityLevel: string;
    setActivityLevel: (a: string) => void;
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
}

const ACTIVITIES = [
    { level: 'Sedentary', key: 'activity_sedentary', descKey: 'desc_sedentary', icon: Armchair },
    { level: 'Lightly Active', key: 'activity_light', descKey: 'desc_light', icon: Footprints },
    { level: 'Active', key: 'activity_active', descKey: 'desc_active', icon: Zap },
    { level: 'Very Active', key: 'activity_very', descKey: 'desc_very', icon: Flame },
];

export function Step7Activity({ activityLevel, setActivityLevel, onNext, onBack, onSkip }: Step7ActivityProps) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full p-6 bg-white text-[#192126]">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#192126]" />
                </button>
                <span className="mx-auto text-lg font-bold">{t.step_activity_header}</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-6">
                {/* Progress Bar - Step 13 of ~16 */}
                {[...Array(13)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                ))}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto no-scrollbar"
            >
                <h1 className="text-2xl font-black mb-2 tracking-tight">{t.step_activity_title}</h1>
                <p className="text-[#5E6468] font-medium mb-8">{t.step_activity_subtitle}</p>

                <div className="space-y-4">
                    {ACTIVITIES.map((act) => {
                        const Icon = act.icon;
                        return (
                            <motion.button
                                key={act.level}
                                onClick={() => setActivityLevel(act.level)}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center p-5 rounded-3xl border-2 transition-all text-left relative overflow-hidden group ${activityLevel === act.level
                                    ? 'bg-[#192126] border-[#192126] shadow-xl'
                                    : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`p-3 rounded-full mr-4 transition-colors ${activityLevel === act.level ? 'bg-white/10' : 'bg-gray-100'}`}>
                                    <Icon className={`w-6 h-6 ${activityLevel === act.level ? 'text-[#BBF246]' : 'text-gray-500'}`} />
                                </div>

                                <div className="flex-1 z-10">
                                    <h3 className={`font-bold text-lg ${activityLevel === act.level ? 'text-white' : 'text-[#192126]'}`}>
                                        {t[act.key]}
                                    </h3>
                                    <p className={`text-sm ${activityLevel === act.level ? 'text-gray-400' : 'text-gray-500'}`}>{t[act.descKey]}</p>
                                </div>

                                {/* Animated Selection Circle */}
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${activityLevel === act.level ? 'bg-[#BBF246]' : 'bg-gray-100'
                                    }`}>
                                    {activityLevel === act.level && <div className="w-2 h-2 bg-[#192126] rounded-full" />}
                                </div>
                            </motion.button>
                        )
                    })}
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
                    <Button onClick={onNext} disabled={!activityLevel}>
                        {t.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
