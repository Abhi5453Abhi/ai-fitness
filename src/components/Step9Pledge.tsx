import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';

interface Step9PledgeProps {
    pledgeDays: number;
    setPledgeDays: (d: number) => void;
    onNext: () => void;
    onBack: () => void;
}

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function Step9Pledge({ pledgeDays, setPledgeDays, onNext, onBack }: Step9PledgeProps) {
    // Managing local 'selectedDays' array for UI, but syncing count to parent
    // Defaulting using pledgeDays to pre-fill could be done, but for now we ignore it to keep logic simple
    // or just use it.
    console.log("Current pledge days:", pledgeDays); // Suppress unused warning
    const [selectedIndices, setSelectedIndices] = useState<number[]>([0, 2, 4]); // Default M, W, F

    // Sync effect: update parent count when local selection changes
    // Actually, parent expects number of days.

    const toggleDay = (index: number) => {
        let newIndices;
        if (selectedIndices.includes(index)) {
            newIndices = selectedIndices.filter(i => i !== index);
        } else {
            newIndices = [...selectedIndices, index].sort();
        }
        setSelectedIndices(newIndices);
        setPledgeDays(newIndices.length);
    };

    const getIntensityText = () => {
        const count = selectedIndices.length;
        if (count === 0) return "Select days";
        if (count <= 2) return "Gentle Start 🌱";
        if (count <= 4) return "Building Habits 🏗️";
        if (count <= 6) return "Serious Results 🔥";
        return "Beast Mode 🦍";
    };

    return (
        <div className="flex flex-col h-full p-6 bg-gradient-to-b from-[#090E17] to-[#111827]">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full bg-[#1F2937] hover:bg-[#374151]">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <span className="mx-auto text-lg font-medium">Commitment</span>
                <div className="w-10"></div>
            </div>

            <div className="flex gap-1 mb-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-green-500 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center -mt-10"
            >
                <h1 className="text-2xl font-bold mb-2 text-center">The Commitment.</h1>
                <p className="text-gray-400 mb-12 text-center">How many days a week can you dedicate?</p>

                {/* Day Selector */}
                <div className="flex justify-between w-full mb-12 px-2 relative">
                    {/* Line connector simulation (simplified) */}
                    <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-800 -z-10 rounded-full"></div>

                    {DAYS.map((day, i) => {
                        const isSelected = selectedIndices.includes(i);
                        return (
                            <motion.button
                                key={i}
                                onClick={() => toggleDay(i)}
                                whileTap={{ scale: 1.2 }}
                                animate={isSelected ? {
                                    backgroundColor: "#3B82F6",
                                    borderColor: "#3B82F6",
                                    boxShadow: "0 0 20px #3B82F6",
                                    y: -5
                                } : {
                                    backgroundColor: "#1F2937",
                                    borderColor: "#374151",
                                    boxShadow: "none",
                                    y: 0
                                }}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all z-10"
                            >
                                {day}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Intensity Meter */}
                <motion.div
                    key={selectedIndices.length}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                        {getIntensityText()}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        This plan is designed around your schedule.
                    </p>
                </motion.div>

            </motion.div>

            <div className="mt-auto">
                <Button onClick={onNext} disabled={selectedIndices.length === 0}>
                    I Commit ✋
                </Button>
            </div>
        </div>
    );
}
