import { useState } from 'react';
import { Utensils, Clock } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { StepWaiting } from './StepWaiting';

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

interface MealPlannerProps {
    planData?: {
        message: string;
        goalSummary: string;
        weeklyPlan: Record<string, DailyPlan>;
    } | null;
    planReadyTime?: number | null;
    onCompleteProfile: () => void;
}

export function MealPlanner({ planData, planReadyTime, onCompleteProfile }: MealPlannerProps) {
    const { t } = useLanguage();
    const [selectedDay, setSelectedDay] = useState<string>("Day 1");
    // Ensure we track readiness locally to force re-render on completion
    const [isReady, setIsReady] = useState(() => !planReadyTime || Date.now() >= planReadyTime);

    // Helper to check if plan is truly empty/skipped
    const isEmpty = !planData || !planData.weeklyPlan;

    const currentDayPlan = planData?.weeklyPlan?.[selectedDay];
    const meals = currentDayPlan?.meals;
    const calories = currentDayPlan?.calories || 2000;

    return (
        <div className="flex-1 overflow-y-auto px-6 pb-28 no-scrollbar">

            {/* Day Selector - Only show if we have data */}
            {!isEmpty && (
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-4">
                    {(planData?.weeklyPlan ? Object.keys(planData.weeklyPlan).sort() : ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]).map((day) => (
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
            {!isReady ? (
                <div className="mb-6">
                    {/* Reuse StepWaiting but inside the dashboard layout */}
                    <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-[60vh]">
                        <StepWaiting
                            targetTime={planReadyTime!}
                            onComplete={() => setIsReady(true)}
                        />
                    </div>
                </div>
            ) : meals ? (
                <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500" key={selectedDay}>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        {selectedDay} {t.todays_plan}
                        <span className="ml-auto text-xs font-bold text-[#BBF246] bg-[#192126] px-2 py-1 rounded-md">{calories} kcal</span>
                    </h3>

                    <div className="space-y-4">
                        {/* Breakfast */}
                        <MealCard
                            title={t.meal_breakfast}
                            time="8:00 AM"
                            icon={<Utensils className="w-4 h-4" />}
                            meal={meals.breakfast}
                            color="bg-orange-50"
                            iconColor="text-orange-500"
                        />

                        {/* Lunch */}
                        <MealCard
                            title={t.meal_lunch}
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
                            title={t.meal_dinner}
                            time="8:00 PM"
                            icon={<Utensils className="w-4 h-4" />}
                            meal={meals.dinner}
                            color="bg-blue-50"
                            iconColor="text-blue-500"
                        />
                    </div>
                </div>
            ) : (
                /* Empty / Skipped State */
                <div className="flex flex-col items-center justify-center p-10 text-center space-y-6 mt-10">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                        <Utensils className="w-8 h-8 opacity-50" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-[#192126]">Complete Your Profile</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            It looks like you skipped the onboarding. To generate a personalized meal plan, we need to know a bit more about you.
                        </p>
                    </div>

                    <button
                        onClick={onCompleteProfile}
                        className="bg-[#BBF246] text-[#192126] px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#a6d93b] active:scale-95 transition-all shadow-lg shadow-[#BBF246]/20"
                    >
                        Answer Questions
                    </button>
                </div>
            )}

        </div>
    )
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
