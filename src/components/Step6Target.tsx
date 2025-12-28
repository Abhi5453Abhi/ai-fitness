import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, Calendar } from 'lucide-react';

interface Step6TargetProps {
    targetWeight: number;
    setTargetWeight: (w: number | ((prev: number) => number)) => void;
    currentWeight: number;
    onNext: () => void;
    onBack: () => void;
}

const MIN_WEIGHT = 40;
const MAX_WEIGHT = 150;
const PIXELS_PER_KG = 50; // Distance between numbers
const TICKS = Array.from({ length: (MAX_WEIGHT - MIN_WEIGHT) + 1 }, (_, i) => MIN_WEIGHT + i);

export function Step6Target({ targetWeight, setTargetWeight, currentWeight, onNext, onBack }: Step6TargetProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    // Add spring physics for smoother feeling
    const smoothX = useSpring(x, { stiffness: 400, damping: 40 });

    // Sync visual position to state
    useEffect(() => {
        // Center the target weight
        // If target is 70, we want 70 to be at center (0 offset relative to center).
        // If our list starts at MIN_WEIGHT (40).
        // Index of 70 is 30. Position is -30 * PIXELS_PER_KG.
        const index = targetWeight - MIN_WEIGHT;
        const targetX = -index * PIXELS_PER_KG;
        x.set(targetX);
    }, [targetWeight, x]);

    const handleDrag = (_: any, info: any) => {
        const move = info.delta.x;
        const currentX = x.get();
        x.set(currentX + move);

        // Calculate weight from -x position
        // x = -index * P => index = -x / P
        // weight = index + MIN
        const rawIndex = -x.get() / PIXELS_PER_KG;
        const rawWeight = rawIndex + MIN_WEIGHT;

        const clamped = Math.round(Math.min(MAX_WEIGHT, Math.max(MIN_WEIGHT, rawWeight)));

        if (clamped !== targetWeight) {
            setTargetWeight(clamped);
        }
    };

    const calculateDate = () => {
        if (!currentWeight) return new Date();
        const diff = Math.abs(currentWeight - targetWeight);
        if (diff === 0) return new Date();
        const ratePerMonth = 2; // kg
        const monthsNeeded = diff / ratePerMonth;
        const date = new Date();
        date.setMonth(date.getMonth() + Math.ceil(monthsNeeded));
        return date;
    };

    const goalDate = calculateDate();
    const monthName = goalDate.toLocaleString('default', { month: 'long' });

    return (
        <div className="flex flex-col h-full p-6 select-none overflow-hidden">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full bg-[#1F2937] hover:bg-[#374151]">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <span className="mx-auto text-lg font-medium">Target</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-8">
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center relative"
            >
                <h1 className="text-2xl font-bold mb-2 text-center">Set your goal.</h1>
                <p className="text-gray-400 mb-12 text-center">Slide to adjust your target.</p>

                {/* Big Number Display */}
                <div className="text-center mb-10">
                    <span className="text-8xl font-bold tracking-tighter text-white">
                        {targetWeight}
                    </span>
                    <span className="text-xl text-gray-500 font-medium ml-2">kg</span>
                </div>

                {/* Tape Measure Container */}
                <div className="relative w-full h-24 flex items-center justify-center overflow-hidden mb-8 mask-linear-fade">
                    {/* Gradient Masks for edges */}
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#090E17] to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#090E17] to-transparent z-20 pointer-events-none"></div>

                    {/* Center Indicator */}
                    <div className="absolute h-12 w-1 bg-[#3B82F6] rounded-full z-30 shadow-[0_0_15px_#3B82F6]"></div>

                    {/* Draggable Tape */}
                    <motion.div
                        ref={containerRef}
                        className="flex items-center absolute left-1/2 cursor-grab active:cursor-grabbing touch-pan-x"
                        style={{ x: smoothX }}
                        drag="x"
                        dragConstraints={{ left: -10000, right: 10000 }} // Virtual constraints handled by logic
                        dragElastic={0}
                        dragMomentum={false} // No momentum to match direct 1:1 feel, or enable for flick
                        onDrag={handleDrag}
                    >
                        {TICKS.map((val) => (
                            <div
                                key={val}
                                className="flex flex-col items-center justify-end h-16 w-[50px] shrink-0 relative" // w-[50px] must match PIXELS_PER_KG
                            >
                                {/* Tick Mark */}
                                <div className={`w-[2px] bg-gray-600 rounded-full ${val % 5 === 0 ? 'h-8 bg-gray-400' : 'h-4'}`}></div>

                                {/* Numbers for every 5kg */}
                                {val % 5 === 0 && (
                                    <span className="absolute -bottom-6 text-xs text-gray-500 font-mono">
                                        {val}
                                    </span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Date Estimator */}
                <div className="h-20 flex items-center justify-center">
                    <motion.div
                        key={targetWeight} // Animate text change
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-6 py-3 rounded-full bg-[#111827] border border-gray-800 flex items-center gap-3 shadow-lg"
                    >
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-gray-300">
                            {currentWeight === targetWeight
                                ? "Maintaing current weight."
                                : `Target date: ${monthName}`
                            }
                        </span>
                    </motion.div>
                </div>

            </motion.div>

            <div className="mt-auto">
                <Button onClick={onNext}>
                    Next
                </Button>
            </div>
        </div>
    );
}
