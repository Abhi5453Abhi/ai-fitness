/**
 * Shared Type Definitions
 * Used by both web and mobile apps
 */

// User types
export type Language = 'en' | 'pa';

export type Gender = 'male' | 'female' | 'other';

export interface User {
    id: string;
    phoneNumber: string;
    name?: string;
    language: Language;
    createdAt: Date;
    onboardingComplete: boolean;
}

// Onboarding types
export interface OnboardingData {
    name?: string;
    goals: string[];
    gender?: Gender;
    age?: number;
    height?: number;
    weight?: number;
    targetWeight?: number;
    dietType?: DietType;
    activityLevel?: ActivityLevel;
    healthConditions?: string[];
    allergies?: string[];
}

export type DietType = 'vegetarian' | 'non_vegetarian' | 'eggetarian' | 'vegan';

export type ActivityLevel = 'sedentary' | 'light' | 'active' | 'very_active';

// Push-up tracking
export interface PushUpAttempt {
    id: string;
    userId: string;
    repCount: number;
    duration: number;
    videoUrl?: string;
    createdAt: Date;
}

// Meal plan types
export interface MealPlan {
    id: string;
    userId: string;
    meals: Meal[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
    createdAt: Date;
}

export interface Meal {
    id: string;
    name: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
}

// API response types
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}

// Store types
export interface StoreItem {
    id: string;
    name: string;
    description: string;
    price: number; // in FitCoins
    imageUrl?: string;
    category: 'reward' | 'badge' | 'discount';
}
