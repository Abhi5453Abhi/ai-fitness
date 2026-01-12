import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, Sun, Briefcase, Moon } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface StepDailyRoutineProps {
    wakeTime: string;
    setWakeTime: (time: string) => void;
    workTime: string;
    setWorkTime: (time: string) => void;
    sleepTime: string;
    setSleepTime: (time: string) => void;
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
}

export function StepDailyRoutine({
    wakeTime, setWakeTime,
    workTime, setWorkTime,
    sleepTime, setSleepTime,
    onNext, onBack, onSkip
}: StepDailyRoutineProps) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full p-6 bg-white text-[#192126] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#192126]" />
                </button>
                <span className="mx-auto text-lg font-bold">{t.step_routine_title}</span>
                <div className="w-10"></div>
            </div>

            {/* Progress Bar - Step 10 of 16 */}
            <div className="flex gap-1 mb-8">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                ))}
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 space-y-6"
            >
                <div>
                    <h1 className="text-2xl font-black mb-2 tracking-tight">{t.step_routine_subtitle}</h1>
                    <p className="text-[#5E6468] font-medium mb-8">{t.step_routine_desc}</p>
                </div>

                {/* Wake Up */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <Sun className="w-4 h-4 text-orange-500" /> {t.label_wake}
                    </label>
                    <input
                        type="time"
                        value={wakeTime}
                        onChange={(e) => setWakeTime(e.target.value)}
                        className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-xl outline-none focus:ring-2 focus:ring-[#BBF246] transition-all text-[#192126]"
                    />
                </div>

                {/* Work/School Start */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <Briefcase className="w-4 h-4 text-blue-500" /> {t.label_work}
                    </label>
                    <input
                        type="time"
                        value={workTime}
                        onChange={(e) => setWorkTime(e.target.value)}
                        className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-xl outline-none focus:ring-2 focus:ring-[#BBF246] transition-all text-[#192126]"
                    />
                </div>

                {/* Sleep */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <Moon className="w-4 h-4 text-indigo-500" /> {t.label_sleep}
                    </label>
                    <input
                        type="time"
                        value={sleepTime}
                        onChange={(e) => setSleepTime(e.target.value)}
                        className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-xl outline-none focus:ring-2 focus:ring-[#BBF246] transition-all text-[#192126]"
                    />
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
                    <Button onClick={onNext} disabled={!wakeTime || !sleepTime}>
                        {t.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
