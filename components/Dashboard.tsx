import { useState } from 'react';
import { Bell, Flame, Footprints, LayoutDashboard, BookOpen, Plus, BarChart3, MoreHorizontal, Flag, Utensils, Zap, Clock, ChevronRight } from 'lucide-react';
import { ActionMenu } from './ActionMenu';
import { LogFood } from './LogFood';

interface Meal {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    description: string;
}

interface DailyPlan {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meals: {
        breakfast: Meal
        lunch: Meal
        dinner: Meal
        snack: Meal
    }
}

interface DashboardProps {
    planData?: {
        message: string;
        goalSummary: string;
        weeklyPlan: Record<string, DailyPlan>;
    } | null;
}

export function Dashboard({ planData }: DashboardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogFoodOpen, setIsLogFoodOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string>("Day 1");

    const currentDayPlan = planData?.weeklyPlan?.[selectedDay];
    const meals = currentDayPlan?.meals;
    const calories = currentDayPlan?.calories || 2000;

    return (
        <div className="flex flex-col h-full bg-white text-[#192126] overflow-hidden relative font-sans">

            {/* Header */}
            <div className="p-6 flex items-center justify-between z-10 bg-white/80 backdrop-blur-md sticky top-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#192126] text-white flex items-center justify-center font-bold text-sm">
                        AH
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Good Morning</p>
                        <h1 className="text-lg font-black leading-none">Abhishek</h1>
                    </div>
                </div>
                <button className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                    <Bell className="w-5 h-5 text-[#192126]" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#ED4747] rounded-full border-2 border-white"></div>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-28 no-scrollbar">

                {/* Day Selector */}
                {planData?.weeklyPlan && (
                    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-4">
                        {Object.keys(planData.weeklyPlan).sort().map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedDay === day
                                    ? 'bg-[#BBF246] text-[#192126] shadow-md shadow-[#BBF246]/20'
                                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                )}

                {/* Meal Plan Section */}
                {meals ? (
                    <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500" key={selectedDay}>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            {selectedDay} Plan <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Indian Diet</span>
                            <span className="ml-auto text-xs font-bold text-[#BBF246] bg-[#192126] px-2 py-1 rounded-md">{calories} kcal</span>
                        </h3>

                        <div className="space-y-4">
                            {/* Breakfast */}
                            <MealCard
                                title="Breakfast"
                                time="8:00 AM"
                                icon={<Utensils className="w-4 h-4" />}
                                meal={meals.breakfast}
                                color="bg-orange-50"
                                iconColor="text-orange-500"
                            />

                            {/* Lunch */}
                            <MealCard
                                title="Lunch"
                                time="1:00 PM"
                                icon={<Utensils className="w-4 h-4" />}
                                meal={meals.lunch}
                                color="bg-emerald-50"
                                iconColor="text-emerald-500"
                            />

                            {/* Snack */}
                            <MealCard
                                title="Snack"
                                time="4:30 PM"
                                icon={<Utensils className="w-4 h-4" />}
                                meal={meals.snack}
                                color="bg-purple-50"
                                iconColor="text-purple-500"
                            />

                            {/* Dinner */}
                            <MealCard
                                title="Dinner"
                                time="8:00 PM"
                                icon={<Utensils className="w-4 h-4" />}
                                meal={meals.dinner}
                                color="bg-blue-50"
                                iconColor="text-blue-500"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-10 text-gray-400">Loading plan...</div>
                )}

            </div>

            <ActionMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onLogFood={() => {
                    setIsMenuOpen(false);
                    setIsLogFoodOpen(true);
                }}
            />

            <LogFood
                isOpen={isLogFoodOpen}
                onClose={() => setIsLogFoodOpen(false)}
            />
        </div>
    );
}

function MealCard({ title, time, icon, meal, color, iconColor }: { title: string, time: string, icon: any, meal: Meal, color: string, iconColor: string }) {
    if (!meal) return null;
    return (
        <div className={`card-clean p-4 border-none ${color} relative overflow-hidden group`}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <div className={`p-2 bg-white rounded-xl ${iconColor} shadow-sm`}>
                        {icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-[#192126] text-sm">{title}</h4>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {time}
                        </p>
                    </div>
                </div>
                <div className="bg-white/60 px-2 py-1 rounded-lg">
                    <span className="text-xs font-bold text-[#192126]">{meal.calories} kcal</span>
                </div>
            </div>

            <div className="mt-2 pl-[calc(2.5rem+0.5rem)]">
                <h3 className="font-bold text-lg leading-tight mb-1 text-[#192126]">{meal.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{meal.description}</p>

                <div className="flex gap-2">
                    <MacroBadge label="P" value={`${meal.protein}g`} color="bg-blue-100 text-blue-700" />
                    <MacroBadge label="C" value={`${meal.carbs}g`} color="bg-green-100 text-green-700" />
                    <MacroBadge label="F" value={`${meal.fat}g`} color="bg-yellow-100 text-yellow-700" />
                </div>
            </div>
        </div>
    )
}

function MacroBadge({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${color}`}>
            {label}: {value}
        </div>
    )
}
