/**
 * Shared Theme Constants
 * Used by both web (Tailwind) and mobile (NativeWind) apps
 */

export const colors = {
    // Primary brand colors
    primary: '#192126',      // Dark charcoal - main text, buttons
    accent: '#BBF246',       // Lime green - highlights, progress bars

    // Backgrounds
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',

    // Text
    textPrimary: '#192126',
    textSecondary: '#5E6468',
    textMuted: '#9CA3AF',

    // Status colors
    success: '#16A34A',
    warning: '#F97316',
    error: '#DC2626',
    info: '#3B82F6',

    // Gray scale
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },
} as const;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
} as const;

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    full: 9999,
} as const;

export const fontSizes = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
} as const;

export type ThemeColors = typeof colors;
export type ThemeSpacing = typeof spacing;
