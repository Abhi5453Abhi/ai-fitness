import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, UserCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface StepWaitingProps {
    targetTime: number;
    onComplete?: () => void;
}

export function StepWaiting({ targetTime, onComplete }: StepWaitingProps) {
    const { t } = useLanguage();

    const [timeLeft, setTimeLeft] = useState(0);

    // Initial load and interval
    useEffect(() => {
        // Calculate initial time left
        const calculateTimeLeft = () => {
            const diff = targetTime - Date.now();
            return Math.max(0, diff);
        };

        const initial = calculateTimeLeft();
        setTimeLeft(initial);

        if (initial <= 0) {
            onComplete?.();
            return;
        }

        const timer = setInterval(() => {
            const remaining = calculateTimeLeft();
            setTimeLeft(remaining);
            if (remaining <= 0) {
                onComplete?.();
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTime, onComplete]);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    return (
        <div className="flex flex-col h-full bg-white items-center justify-center p-6 text-[#192126] text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 max-w-sm w-full"
            >
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserCheck className="w-8 h-8" />
                </div>

                <h1 className="text-2xl font-black mb-4">{t.waiting_title}</h1>
                <p className="text-[#5E6468] font-medium mb-8 leading-relaxed">
                    {t.waiting_subtitle}
                </p>

                <div className="bg-[#192126] text-white p-4 rounded-xl mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{t.time_remaining}</div>
                    <div className="text-3xl font-black font-mono">
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{t.waiting_note}</span>
                </div>
            </motion.div>
        </div>
    );
}
