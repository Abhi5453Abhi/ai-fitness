import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowLeft, AlertCircle, GlassWater, Milk, Cookie, Utensils } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface StepCurrentFoodProps {
    currentBreakfast: string;
    setCurrentBreakfast: (v: string) => void;
    currentLunch: string;
    setCurrentLunch: (v: string) => void;
    currentDinner: string;
    setCurrentDinner: (v: string) => void;

    junkFood: boolean;
    setJunkFood: (v: boolean) => void;
    milkIntake: boolean;
    setMilkIntake: (v: boolean) => void;
    waterIntake: boolean; // true = good, false = bad/low
    setWaterIntake: (v: boolean) => void;

    onNext: () => void;
    onBack: () => void;
}

export function StepCurrentFood({
    currentBreakfast, setCurrentBreakfast,
    currentLunch, setCurrentLunch,
    currentDinner, setCurrentDinner,
    junkFood, setJunkFood,
    milkIntake, setMilkIntake,
    waterIntake, setWaterIntake,
    onNext, onBack
}: StepCurrentFoodProps) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full p-6 bg-white text-[#192126]">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-[#192126]" />
                </button>
                <span className="mx-auto text-lg font-bold">{t.step_food_title}</span>
                <div className="w-10"></div>
            </div>

            {/* Progress Bar - Step 9 of 16 */}
            <div className="flex gap-1 mb-8">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-[#BBF246] rounded-full"></div>
                ))}
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto no-scrollbar pb-4"
            >
                <h1 className="text-2xl font-black mb-6 tracking-tight">{t.step_food_subtitle}</h1>

                {/* Inputs */}
                <div className="space-y-5 mb-8">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">{t.meal_breakfast}</label>
                        <div className="relative">
                            <Utensils className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t.placeholder_breakfast}
                                value={currentBreakfast}
                                onChange={(e) => setCurrentBreakfast(e.target.value)}
                                className="w-full p-4 pl-12 bg-gray-50 rounded-2xl font-bold text-[#192126] focus:ring-2 focus:ring-[#BBF246] outline-none transition-all placeholder:font-medium placeholder:text-gray-300"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">{t.meal_lunch}</label>
                        <div className="relative">
                            <Utensils className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t.placeholder_lunch}
                                value={currentLunch}
                                onChange={(e) => setCurrentLunch(e.target.value)}
                                className="w-full p-4 pl-12 bg-gray-50 rounded-2xl font-bold text-[#192126] focus:ring-2 focus:ring-[#BBF246] outline-none transition-all placeholder:font-medium placeholder:text-gray-300"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">{t.meal_dinner}</label>
                        <div className="relative">
                            <Utensils className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t.placeholder_dinner}
                                value={currentDinner}
                                onChange={(e) => setCurrentDinner(e.target.value)}
                                className="w-full p-4 pl-12 bg-gray-50 rounded-2xl font-bold text-[#192126] focus:ring-2 focus:ring-[#BBF246] outline-none transition-all placeholder:font-medium placeholder:text-gray-300"
                            />
                        </div>
                    </div>
                </div>

                <div className="">
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4">{t.label_habits}</h3>
                    <div className="space-y-3">
                        {/* Junk Food */}
                        <button
                            onClick={() => setJunkFood(!junkFood)}
                            className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${junkFood ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-red-100 rounded-full text-red-500"><Cookie className="w-5 h-5" /></div>
                                <span className={`font-bold text-sm ${junkFood ? 'text-red-900' : 'text-[#192126]'}`}>{t.habit_junk}</span>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${junkFood ? 'bg-red-500 border-red-500' : 'border-gray-200'}`}>
                                {junkFood && <span className="text-white text-xs">✓</span>}
                            </div>
                        </button>

                        {/* Milk */}
                        <button
                            onClick={() => setMilkIntake(!milkIntake)}
                            className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${milkIntake ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-100 rounded-full text-blue-500"><Milk className="w-5 h-5" /></div>
                                <span className={`font-bold text-sm ${milkIntake ? 'text-blue-900' : 'text-[#192126]'}`}>{t.habit_milk}</span>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${milkIntake ? 'bg-blue-500 border-blue-500' : 'border-gray-200'}`}>
                                {milkIntake && <span className="text-white text-xs">✓</span>}
                            </div>
                        </button>

                        {/* Low Water */}
                        <button
                            onClick={() => setWaterIntake(!waterIntake)}
                            className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${!waterIntake ? 'border-orange-200 bg-orange-50' : 'border-gray-100 bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-orange-100 rounded-full text-orange-500"><GlassWater className="w-5 h-5" /></div>
                                <span className={`font-bold text-sm ${!waterIntake ? 'text-orange-900' : 'text-[#192126]'}`}>{t.habit_water}</span>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${!waterIntake ? 'bg-orange-500 border-orange-500' : 'border-gray-200'}`}>
                                {!waterIntake && <span className="text-white text-xs">✓</span>}
                            </div>
                        </button>
                    </div>
                </div>
            </motion.div>

            <div className="mt-4 pt-6 border-t border-gray-100">
                <Button onClick={onNext}>{t.next}</Button>
            </div>
        </div>
    );
}
