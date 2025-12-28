import { useState } from 'react';
import { Bell, Flame, Footprints, LayoutDashboard, BookOpen, Plus, BarChart3, MoreHorizontal, Flag, Utensils } from 'lucide-react';
import { ActionMenu } from './ActionMenu';
import { LogFood } from './LogFood';

interface DashboardProps {
    planData?: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
        plan: string;
    } | null;
}

export function Dashboard({ planData }: DashboardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogFoodOpen, setIsLogFoodOpen] = useState(false);

    // Default fallback values if no planData
    const calories = planData?.calories || 2000;
    const protein = planData?.protein || 150;
    const carbs = planData?.carbs || 200;
    const fats = planData?.fats || 65;

    return (
        <div className="flex flex-col h-full bg-[#090E17] text-white overflow-hidden relative">

            {/* Header */}
            <div className="p-6 flex items-center justify-between z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 item-center justify-center flex items-center font-bold text-sm">
                    AH
                </div>
                <h1 className="text-lg font-bold tracking-tight">myfitnesspal</h1>
                <button className="relative p-2">
                    <Bell className="w-6 h-6 text-white" />
                    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#090E17]"></div>
                </button>
            </div>

            {/* AI Insight Banner */}
            <div className="px-6 mb-6">
                {planData ? (
                    <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/20 border border-blue-500/30 p-4 rounded-2xl">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <span className="text-xl">🤖</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-100 text-sm mb-1">AI Personalized Plan</h3>
                                <p className="text-xs text-blue-200/80 leading-relaxed line-clamp-3">
                                    {planData.plan}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 p-3 rounded-full flex items-center justify-center shadow-lg shadow-yellow-900/20">
                        <span className="text-black font-bold text-sm">Go Premium</span>
                    </div>
                )}
            </div>

            {/* Main Content Scrollable */}
            <div className="flex-1 overflow-y-auto pb-24 px-6 no-scrollbar">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Today</h2>
                    <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">Edit</button>
                </div>

                {/* Calorie Card */}
                <div className="bg-[#111827] rounded-3xl p-6 border border-gray-800 shadow-xl mb-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>

                    <h3 className="tex-sm font-medium text-gray-400 mb-1">Calories</h3>
                    <p className="text-xs text-gray-500 mb-6 font-mono">Remaining = Goal - Food + Exercise</p>

                    <div className="flex items-center gap-8">
                        {/* Circular Progress Ring */}
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            {/* Background Ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="64" cy="64" r="56" stroke="#1f2937" strokeWidth="8" fill="none" />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="#3B82F6"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray="351"
                                    strokeDashoffset="75" // Mock 80% filled
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="text-center">
                                <span className="text-2xl font-bold block leading-none">{calories}</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Remaining</span>
                            </div>
                        </div>

                        {/* Legend Stats */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Flag className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-400">Base Goal</span>
                                </div>
                                <span className="font-bold">{calories}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Utensils className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-gray-400">Food</span>
                                </div>
                                <span className="font-bold">0</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Flame className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm text-gray-400">Exercise</span>
                                </div>
                                <span className="font-bold">0</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Macros Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#111827] rounded-2xl p-4 border border-gray-800 flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">Protein</span>
                        <span className="text-xl font-bold text-green-400">{protein}g</span>
                        <div className="w-full h-1 bg-gray-800 rounded-full mt-2"><div className="w-3/4 h-full bg-green-500 rounded-full"></div></div>
                    </div>
                    <div className="bg-[#111827] rounded-2xl p-4 border border-gray-800 flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">Carbs</span>
                        <span className="text-xl font-bold text-blue-400">{carbs}g</span>
                        <div className="w-full h-1 bg-gray-800 rounded-full mt-2"><div className="w-1/2 h-full bg-blue-500 rounded-full"></div></div>
                    </div>
                    <div className="bg-[#111827] rounded-2xl p-4 border border-gray-800 flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">Fat</span>
                        <span className="text-xl font-bold text-purple-400">{fats}g</span>
                        <div className="w-full h-1 bg-gray-800 rounded-full mt-2"><div className="w-1/4 h-full bg-purple-500 rounded-full"></div></div>
                    </div>
                </div>

                {/* Secondary Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Steps Widget */}
                    <div className="bg-[#111827] rounded-3xl p-5 border border-gray-800 flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-10 bg-green-500/10 blur-2xl rounded-full -mr-5 -mt-5"></div>
                        <div className="flex justify-between items-start">
                            <span className="font-medium text-gray-300">Steps</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Footprints className="w-5 h-5 text-red-400" />
                                <span className="text-xl font-bold">26</span>
                            </div>
                            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full w-[2%] bg-red-500 rounded-full"></div>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">Goal: 10,000 steps</p>
                        </div>
                    </div>

                    {/* Exercise Widget */}
                    <div className="bg-[#111827] rounded-3xl p-5 border border-gray-800 flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-10 bg-orange-500/10 blur-2xl rounded-full -mr-5 -mt-5"></div>
                        <div className="flex justify-between items-start">
                            <span className="font-medium text-gray-300">Exercise</span>
                            <Plus className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium">0 cal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border border-orange-500/30 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-400">00:00 hr</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#090E17]/90 backdrop-blur-lg border-t border-gray-800 px-6 py-4 pb-8 flex justify-between items-center z-20">
                <button className="flex flex-col items-center gap-1 text-blue-500">
                    <LayoutDashboard className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Dashboard</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Diary</span>
                </button>

                {/* FAB */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 -mt-8 border-4 border-[#090E17]"
                >
                    <Plus className="w-8 h-8 text-white" />
                </button>

                <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
                    <BarChart3 className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Progress</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal className="w-6 h-6" />
                    <span className="text-[10px] font-medium">More</span>
                </button>
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
