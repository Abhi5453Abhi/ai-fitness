/**
 * Shared Utility Functions
 */

import { POINTS_CONFIG } from './constants';

/**
 * Calculate points from rep count
 */
export function calculatePoints(repCount: number): number {
    return repCount * POINTS_CONFIG.pointsPerRep;
}

/**
 * Calculate coins from rep count
 */
export function calculateCoins(repCount: number): number {
    return repCount * POINTS_CONFIG.coinsPerRep;
}

/**
 * Get greeting based on time of day
 */
export function getGreetingKey(): 'greeting_morning' | 'greeting_afternoon' | 'greeting_evening' {
    const hour = new Date().getHours();
    if (hour < 12) return 'greeting_morning';
    if (hour < 17) return 'greeting_afternoon';
    return 'greeting_evening';
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
}

/**
 * Calculate BMI
 */
export function calculateBMI(heightCm: number, weightKg: number): number {
    const heightM = heightCm / 100;
    return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
 */
export function calculateBMR(
    weightKg: number,
    heightCm: number,
    age: number,
    gender: 'male' | 'female' | 'other'
): number {
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    if (gender === 'male') return Math.round(base + 5);
    if (gender === 'female') return Math.round(base - 161);
    return Math.round(base - 78); // Average for 'other'
}

/**
 * Validate phone number (Indian format)
 */
export function isValidPhoneNumber(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]/.test(cleaned);
}
