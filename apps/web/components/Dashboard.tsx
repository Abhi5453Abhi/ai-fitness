import { useState } from 'react';
import { Bell, Flame, Footprints, LayoutDashboard, BookOpen, Plus, BarChart3, MoreHorizontal, Flag, Utensils, Zap, Clock, ChevronRight } from 'lucide-react';
import { ActionMenu } from './ActionMenu';
import { LogFood } from './LogFood';
import { useLanguage } from './LanguageContext';
import { MealPlanner } from './MealPlanner';
import { BottomNav } from './BottomNav';
import { ChallengeSection } from './ChallengeSection';
import { PushUpChallenge } from './PushUpChallenge';
import { Store } from './Store';
import { UploadProgressToast } from './UploadProgressToast';

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
    name: string;
    points: number;
    planData?: {
        message: string;
        goalSummary: string;
        weeklyPlan: Record<string, DailyPlan>;
    } | null;
    planReadyTime?: number | null;
    onCompleteProfile: () => void;
    onRefreshPoints?: () => void;
}

export function Dashboard({ name, points, planData, planReadyTime, onCompleteProfile, onRefreshPoints }: DashboardProps) {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogFoodOpen, setIsLogFoodOpen] = useState(false);

    // Navigation State
    const [activeTab, setActiveTab] = useState<'meal' | 'challenge' | 'store'>('meal');
    const [showPushUpChallenge, setShowPushUpChallenge] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t.greeting_morning;
        if (hour < 18) return t.greeting_afternoon;
        return t.greeting_evening;
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    return (
        <div className="flex flex-col h-full bg-white text-[#192126] overflow-hidden relative font-sans">

            {/* Header */}
            <div className="p-6 flex items-center justify-between z-10 bg-white/80 backdrop-blur-md sticky top-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#192126] text-white flex items-center justify-center font-bold text-sm">
                        {getInitials(name)}
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{getGreeting()}</p>
                        <h1 className="text-lg font-black leading-none">{name}</h1>
                    </div>
                </div>

                {/* Points Display */}
                <div className="flex items-center gap-1 bg-[#BBF246]/20 px-3 py-1.5 rounded-full border border-[#BBF246]/20">
                    <Zap className="w-4 h-4 text-[#BBF246] fill-[#BBF246]" />
                    <span className="font-black text-sm">{points}</span>
                </div>
            </div>

            {/* Main Content Area */}
            {activeTab === 'meal' && (
                <MealPlanner planData={planData} planReadyTime={planReadyTime} onCompleteProfile={onCompleteProfile} />
            )}
            {activeTab === 'challenge' && (
                <ChallengeSection onOpenPushUpChallenge={() => setShowPushUpChallenge(true)} />
            )}
            {activeTab === 'store' && (
                <Store />
            )}

            {/* Bottom Navigation */}
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Full Screen Modals */}
            {showPushUpChallenge && (
                <PushUpChallenge onBack={() => setShowPushUpChallenge(false)} onRefreshPoints={onRefreshPoints} />
            )}

            {/* Upload Progress Toast - Only visible in Challenge Tab */}
            {activeTab === 'challenge' && <UploadProgressToast />}

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


