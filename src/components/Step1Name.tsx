import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';

interface Step1NameProps {
    name: string;
    setName: (name: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export function Step1Name({ name, setName, onNext, onBack }: Step1NameProps) {
    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center mb-8">
                <button onClick={onBack} className="p-2 rounded-full bg-[#1F2937] hover:bg-[#374151] transition-colors">
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <span className="mx-auto text-lg font-medium">Welcome</span>
                <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            <div className="flex gap-1 mb-8">
                <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-700 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1"
            >
                <h1 className="text-3xl font-bold mb-2">
                    First, what can we call you?
                </h1>
                <p className="text-gray-400 mb-8">
                    We'd like to get to know you.
                </p>

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-500 mb-2">
                        Preferred first name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                </div>
            </motion.div>

            <div className="mt-auto">
                <Button onClick={onNext} disabled={!name}>
                    Next
                </Button>
            </div>
        </div>
    );
}
