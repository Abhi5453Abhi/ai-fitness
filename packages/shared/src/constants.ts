/**
 * Shared Constants
 * API endpoints, config values, etc.
 */

// API Configuration
export const API_CONFIG = {
    // Update this when deploying the backend
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    endpoints: {
        login: '/api/auth/login',
        userSync: '/api/user/sync',
        pushUpAttempt: '/api/push-up/attempt',
        mealPlan: '/api/meal-plan',
        store: '/api/store',
    },
} as const;

// Points calculation
export const POINTS_CONFIG = {
    pointsPerRep: 2.5,
    coinsPerRep: 1,
} as const;

// Onboarding steps
export const ONBOARDING_STEPS = [
    { id: 1, name: 'name', label: 'Name' },
    { id: 2, name: 'goals', label: 'Goals' },
    { id: 3, name: 'motivation', label: 'Motivation' },
    { id: 4, name: 'biometrics', label: 'Biometrics' },
    { id: 5, name: 'metrics', label: 'Metrics' },
    { id: 6, name: 'target', label: 'Target' },
] as const;

// Goals list
export const GOALS = [
    { id: 'goal_lose_weight', icon: 'scale', color: '#3B82F6' },
    { id: 'goal_gain_muscle', icon: 'dumbbell', color: '#F97316' },
    { id: 'goal_get_fit', icon: 'heart', color: '#EF4444' },
    { id: 'goal_manage_stress', icon: 'brain', color: '#8B5CF6' },
    { id: 'goal_improve_sleep', icon: 'moon', color: '#6366F1' },
    { id: 'goal_increase_energy', icon: 'zap', color: '#F59E0B' },
] as const;

// Activity levels
export const ACTIVITY_LEVELS = [
    { id: 'sedentary', multiplier: 1.2 },
    { id: 'light', multiplier: 1.375 },
    { id: 'active', multiplier: 1.55 },
    { id: 'very_active', multiplier: 1.725 },
] as const;
