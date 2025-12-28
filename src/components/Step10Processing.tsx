import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Step10ProcessingProps {
    userData: {
        name: string;
        selectedGoals: string[];
        gender: string;
        age: number;
        height: number;
        weight: number;
        targetWeight: number;
        weeklyRate: string;
        habits: string[];
        activityLevel: string;
        barriers: string[];
        pledgeDays: number;
        userId: string;
    };
    setPlanData: (data: any) => void;
    onNext: () => void;
}

const QUOTES = [
    "Rome wasn't built in a day, but they were laying bricks every hour.",
    "The body achieves what the mind believes.",
    "Your future self is watching you right now through memories.",
    "Don't stop when you're tired. Stop when you're done.",
    "Discipline is doing what needs to be done, even if you don't want to do it."
];

export function Step10Processing({ userData, setPlanData, onNext }: Step10ProcessingProps) {
    const [quoteIndex, setQuoteIndex] = useState(0);

    // Rotate quotes
    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex(prev => (prev + 1) % QUOTES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const hasFetched = useRef(false);

    // Fetch Plan
    useEffect(() => {
        const fetchPlan = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            try {
                // In a real app, use the actual backend URL. 
                // For dev: http://localhost:8081
                const response = await fetch('http://localhost:8081/api/generate-plan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });

                if (!response.ok) throw new Error("Failed to fetch");

                const data = await response.json();
                setPlanData(data);

                // Allow valid animation time before proceeding
                setTimeout(() => {
                    onNext();
                }, 2000); // Minimum 2s wait for effect

            } catch (error) {
                console.error("Error generating plan:", error);
                // Fallback or error handling - maybe navigate anyway with mock data or show error
                // For now, let's just log it.
            }
        };

        fetchPlan();
    }, []); // Run once on mount

    return (
        <div className="flex flex-col h-full bg-[#090E17] relative overflow-hidden items-center justify-center p-6">

            {/* Background Matrix Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-green-500 text-xs font-mono"
                        initial={{ top: -100, left: `${Math.random() * 100}%` }}
                        animate={{ top: '100%' }}
                        transition={{
                            duration: Math.random() * 5 + 2,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 2
                        }}
                    >
                        {Math.random().toString(2).substring(2, 10)}
                    </motion.div>
                ))}
            </div>

            <motion.div className="z-10 text-center max-w-sm">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-4 border-gray-800 border-t-[#3B82F6] rounded-full mx-auto mb-8"
                />

                <div className="h-8 overflow-hidden relative mb-8">
                    <motion.div
                        animate={{ y: -64 }} // Scroll up through 3 items
                        transition={{ duration: 4, times: [0, 0.3, 0.6, 1], repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xl font-medium text-blue-200">Analyzing your goals...</span>
                        <span className="text-xl font-medium text-green-200">Crunching biometrics...</span>
                        <span className="text-xl font-medium text-purple-200">Optimizing nutrition...</span>
                    </motion.div>
                </div>

                {/* Rotating Quote */}
                <motion.div
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-20"
                >
                    <p className="text-gray-400 italic">"{QUOTES[quoteIndex]}"</p>
                </motion.div>
            </motion.div>

        </div>
    );
}
