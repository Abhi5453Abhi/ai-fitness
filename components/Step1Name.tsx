import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Step1NameProps {
    name: string;
    setName: (name: string) => void;
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
}

export function Step1Name({ name, setName, onNext, onBack, onSkip }: Step1NameProps) {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col h-full p-6 text-[#192126] bg-white">
            <div className="flex items-center mb-8">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-[#192126]" />
                </button>
                <span className="mx-auto text-lg font-bold">1/10</span>
                <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            {/* Progress Bar */}
            <div className="flex gap-1 mb-8">
                <div className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1"
            >
                <h1 className="text-3xl font-black mb-2 tracking-tight">
                    {t.step1_title}
                </h1>
                <p className="text-[#5E6468] font-medium mb-8">
                    {t.step1_subtitle}
                </p>

                <div className="mb-4">
                    <label className="block text-sm font-bold text-[#192126] mb-2 uppercase tracking-wide">
                        {t.name_placeholder}
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.name_placeholder}
                        className="input-clean text-lg font-bold"
                        autoFocus
                    />
                </div>
            </motion.div>

            <div className="mt-auto pt-6 flex gap-3">
                <button
                    onClick={onSkip}
                    className="flex-1 py-4 rounded-xl font-bold text-[#192126] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    Skip
                </button>
                <div className="flex-[2]">
                    <Button onClick={onNext} disabled={!name}>
                        {t.next}
                    </Button>
                </div>
            </div>
        </div>
    );
}
