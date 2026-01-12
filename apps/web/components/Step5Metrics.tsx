// import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';
import { TapeMeasure } from './TapeMeasure';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';

interface Step5MetricsProps {
    height: number | null;
    setHeight: (h: number | null) => void;
    weight: number | null;
    setWeight: (w: number | null) => void;
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
}

export function Step5Metrics({ height, setHeight, weight, setWeight, onNext, onBack, onSkip }: Step5MetricsProps) {
    const { t } = useLanguage();
    const [focusedInput, setFocusedInput] = useState<'height' | 'weight' | null>(null);

    // Visual defaults
    const displayHeight = height ?? 170;
    const displayWeight = weight ?? 70;

    return (
        <div className="flex flex-col h-full p-6 bg-white text-[#192126] overflow-y-auto">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#192126]" />
                </button>
                <span className="mx-auto text-lg font-bold">{t.step5_title}</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                ))}
                <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex flex-col justify-center gap-12 relative">
                {/* Note: Relative allows overlaying manual input fields if desired, but we'll stack them for clarity */}

                {/* Hiding the TapeMeasure's built-in text to use our own manual input */}

                {/* Height Section */}
                <div className="flex flex-col items-center">
                    <label className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-2">{t.label_height}</label>
                    <div className="relative flex items-end justify-center mb-4 sm:mb-6">
                        <input
                            type="number"
                            value={displayHeight}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            onFocus={() => setFocusedInput('height')}
                            onBlur={() => setFocusedInput(null)}
                            className={`text-5xl sm:text-7xl font-black bg-transparent text-center w-36 sm:w-48 outline-none p-0 m-0 ${focusedInput === 'height' ? 'text-[#BBF246]' : 'text-[#192126]'} transition-colors`}
                        />
                        <span className="text-lg sm:text-xl text-gray-400 font-bold mb-2 sm:mb-4 ml-1">{t.unit_cm}</span>
                    </div>

                    <div className="w-full h-16 sm:h-24 relative opacity-50 hover:opacity-100 transition-opacity">
                        <TapeMeasure
                            value={displayHeight}
                            onChange={setHeight}
                            min={100}
                            max={250}
                            step={50}
                            orientation="horizontal"
                            unit=""
                            label=""
                            showTickLabels={false}
                            showValue={false}
                        />
                    </div>
                </div>

                {/* Weight Section */}
                <div className="flex flex-col items-center">
                    <label className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-2">{t.label_weight}</label>
                    <div className="relative flex items-end justify-center mb-4 sm:mb-6">
                        <input
                            type="number"
                            value={displayWeight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            onFocus={() => setFocusedInput('weight')}
                            onBlur={() => setFocusedInput(null)}
                            className={`text-5xl sm:text-7xl font-black bg-transparent text-center w-36 sm:w-48 outline-none p-0 m-0 ${focusedInput === 'weight' ? 'text-[#BBF246]' : 'text-[#192126]'} transition-colors`}
                        />
                        <span className="text-lg sm:text-xl text-gray-400 font-bold mb-2 sm:mb-4 ml-1">{t.unit_kg}</span>
                    </div>

                    <div className="w-full h-16 sm:h-24 relative opacity-50 hover:opacity-100 transition-opacity">
                        <TapeMeasure
                            value={displayWeight}
                            onChange={setWeight}
                            min={30}
                            max={200}
                            step={50}
                            orientation="horizontal"
                            unit=""
                            label=""
                            showTickLabels={false}
                            showValue={false}
                        />
                    </div>
                </div>

            </div>

            <div className="mt-auto z-20 pt-6 border-t border-gray-100 flex gap-3">
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
