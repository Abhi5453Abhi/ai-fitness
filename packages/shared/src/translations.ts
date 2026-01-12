/**
 * Shared Translation Strings
 * Used by both web (React) and mobile (React Native) apps
 */

import type { Language } from './types';

export const translations = {
    en: {
        // Login & Auth
        welcome_back: 'Welcome Back',
        enter_mobile: 'Enter your number to start your journey.',
        mobile_number: 'Mobile Number',
        login: 'Login',
        verify_code: 'Verify Code',
        select_language: 'Select Language',
        choose_preferred: 'Choose your preferred language',
        english: 'English',
        punjabi: 'Punjabi',

        // Navigation
        next: 'Next',
        back: 'Back',
        continue: 'Continue',
        skip: 'Skip',

        // Step 1: Name
        step1_title: "Let's start with your name",
        step1_subtitle: "We'd love to know what to call you.",
        name_placeholder: 'Your Name',

        // Step 2: Goals
        step2_title: 'What brings you here?',
        step2_subtitle: 'Select up to 3 goals that matter to you.',
        goal_lose_weight: 'Lose Weight',
        goal_gain_muscle: 'Gain Muscle',
        goal_get_fit: 'Get Fit',
        goal_manage_stress: 'Manage Stress',
        goal_improve_sleep: 'Improve Sleep',
        goal_increase_energy: 'Increase Energy',

        // Step 3: Motivation
        real_talk: 'OK, real talk:',
        motivation_default_title: "Let's Optimize You",
        motivation_default_sub: "Based on your goals, we're constructing a personalized protocol.",
        motivation_synergy_title: "Synergy Protocol",
        motivation_synergy_sub: "We have detected multiple goals. Creating a unified composite protocol.",
        motivation_muscle_title: "Hypertrophy Engine",
        motivation_muscle_sub: "Focussing on mechanical tension and metabolic stress to maximize fiber growth.",
        motivation_diet_title: "Metabolic Reset",
        motivation_diet_sub: "Optimizing your caloric intake and macronutrient ratios for sustainability.",
        motivation_stress_title: "Cortisol Management",
        motivation_stress_sub: "Regulating stress hormones is key to physical transformation.",
        motivation_active_title: "Activity Volume",
        motivation_active_sub: "Increasing your NEAT (Non-Exercise Activity Thermogenesis) safely.",
        ps_message: "P.S. This isn't just a generic plan. It's built for your specific physiology.",

        // Step 4: Biometrics
        step4_title: 'Tell us about yourself',
        step4_subtitle: 'This helps us personalize your plan.',
        gender_male: 'Male',
        gender_female: 'Female',
        gender_other: 'Other',
        age_label: 'Age',
        years_old: 'years old',

        // Step 5: Metrics
        step5_title: 'Your Body Metrics',
        step5_subtitle: 'Used to calculate your metabolic rate.',
        label_height: 'Height',
        label_weight: 'Weight',
        unit_cm: 'cm',
        unit_kg: 'kg',

        // Step 6: Target
        step6_title: 'What represents success?',
        step6_subtitle: 'Set a realistic target weight.',
        target_weight_label: 'Target Weight',
        current_weight: 'Current',

        // Step 7: Activity
        step_activity_header: "Activity",
        step_activity_title: "Your daily rhythm.",
        step_activity_subtitle: "How active are you right now?",
        activity_sedentary: "Sedentary",
        desc_sedentary: "Little or no exercise",
        activity_light: "Lightly Active",
        desc_light: "Exercise 1-3 times/week",
        activity_active: "Active",
        desc_active: "Exercise 3-5 times/week",
        activity_very: "Very Active",
        desc_very: "Hard exercise 6-7 days/week",

        // Step 8: Diet Type
        step_diet_title: "Diet Preference",
        step_diet_subtitle: "Do you eat meat?",
        step_diet_desc: "This helps us recommend the right protein sources.",
        diet_vegetarian: "Vegetarian",
        diet_vegetarian_desc: "No meat, egg optional",
        diet_non_vegetarian: "Non-Vegetarian",
        diet_non_vegetarian_desc: "I eat everything",
        diet_eggetarian: "Eggetarian",
        diet_eggetarian_desc: "Veg + Eggs",
        diet_vegan: "Vegan",
        diet_vegan_desc: "No animal products",


        // Step 8: Barriers
        step8_title: "Any roadblocks?",
        step8_subtitle: "Do you follow any specific diet or have habits we should combat?",
        barrier_snacking: "Late Night Snacking",
        barrier_sugar: "Sugar Cravings",
        barrier_stress: "Stress Eating",
        barrier_time: "Limited Time",
        barrier_cooking: "Cooking Difficulty",
        barrier_social: "Social Events",
        barrier_metabolism: "Slow Metabolism",
        barrier_sleep: "Lack of Sleep",
        barrier_motivation: "Motivation Drops",
        toast_got_it: "Got it.",
        toast_strategy: "We'll build a strategy for that.",

        // Step 9: Pledge
        step9_title: "The Commitment.",
        step9_subtitle: "How many days a week can you dedicate?",
        pledge_gentle: "Gentle Start 🌱",
        pledge_habits: "Building Habits 🏗️",
        pledge_results: "Serious Results 🔥",
        pledge_beast: "Beast Mode 🦍",
        pledge_select: "Select days",
        pledge_button: "I Commit ✋",
        days_short: "M,T,W,T,F,S,S",

        // Step 10: Processing
        analyzing_profile: "Analyzing your profile...",
        crafting_meals: "Crafting delicious meals...",
        waiting_title: "Expertly Crafting Your Plan",
        waiting_subtitle: "Our nutritionists are reviewing your details. Your personalized plan will be ready in 5-10 minutes.",
        time_remaining: "Time Remaining",
        waiting_note: "You can close the app and come back later.",
        plan_ready: "Your plan is ready!",
        view_plan: "View Plan",

        // Dashboard
        greeting_morning: 'Good Morning',
        greeting_afternoon: 'Good Afternoon',
        greeting_evening: 'Good Evening',
        todays_plan: "Today's Plan",
        calories: 'Calories',
        protein: 'Protein',
        carbs: 'Carbs',
        fats: 'Fats',
    },
    pa: {
        // Login & Auth
        welcome_back: 'ਜੀ ਆਇਆਂ ਨੂੰ',
        enter_mobile: 'ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਭਰੋ।',
        mobile_number: 'ਮੋਬਾਈਲ ਨੰਬਰ',
        login: 'ਲੌਗ ਇਨ',
        verify_code: 'ਕੋਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
        select_language: 'ਭਾਸ਼ਾ ਚੁਣੋ',
        choose_preferred: 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ',
        english: 'ਅੰਗਰੇਜ਼ੀ',
        punjabi: 'ਪੰਜਾਬੀ',

        // Navigation
        next: 'ਅੱਗੇ',
        back: 'ਪਿੱਛੇ',
        continue: 'ਜਾਰੀ ਰੱਖੋ',
        skip: 'ਛੱਡੋ',

        // Step 1: Name
        step1_title: 'ਆਓ ਤੁਹਾਡੇ ਨਾਮ ਨਾਲ ਸ਼ੁਰੂ ਕਰੀਏ',
        step1_subtitle: 'ਅਸੀਂ ਤੁਹਾਨੂੰ ਕੀ ਬੁਲਾਈਏ?',
        name_placeholder: 'ਤੁਹਾਡਾ ਨਾਮ',

        // Step 2: Goals
        step2_title: 'ਤੁਸੀਂ ਇੱਥੇ ਕਿਉਂ ਆਏ ਹੋ?',
        step2_subtitle: 'ਕੋਈ ਵੀ 3 ਟੀਚੇ ਚੁਣੋ ਜੋ ਤੁਹਾਡੇ ਲਈ ਮਹੱਤਵਪੂਰਨ ਹਨ।',
        goal_lose_weight: 'ਭਾਰ ਘਟਾਉਣਾ ਹੈ',
        goal_gain_muscle: 'ਮਾਸਪੇਸ਼ੀਆਂ ਬਣਾਉਣੀਆ ਹਨ',
        goal_get_fit: 'ਤੰਦਰੁਸਤ ਰਹਿਣਾ ਹੈ',
        goal_manage_stress: 'ਤਣਾਅ ਘਟਾਉਣਾ ਹੈ',
        goal_improve_sleep: 'ਨੀਂਦ ਸੁਧਾਰਨੀ ਹੈ',
        goal_increase_energy: 'ਊਰਜਾ ਵਧਾਉਣੀ ਹੈ',

        // Step 3: Motivation
        real_talk: 'ਸੱਚੀ ਗੱਲ:',
        motivation_default_title: 'ਭਾਰ ਘਟਾਉਣਾ ਹਮੇਸ਼ਾ ਆਸਾਨ ਨਹੀਂ ਹੁੰਦਾ।',
        motivation_default_sub: 'ਪਰ ਅਸੀਂ ਹਰ ਉਤਰਾਅ-ਚੜ੍ਹਾਅ ਵਿੱਚ ਤੁਹਾਡੀ ਹੌਸਲਾ ਅਫਜ਼ਾਈ ਕਰਾਂਗੇ।',
        motivation_synergy_title: "ਸਿਨਰਜੀ ਪ੍ਰੋਟੋਕੋਲ",
        motivation_synergy_sub: "ਅਸੀਂ ਕਈ ਟੀਚਿਆਂ ਦਾ ਪਤਾ ਲਗਾਇਆ ਹੈ। ਇੱਕ ਸੰਯੁਕਤ ਪ੍ਰੋਟੋਕੋਲ ਬਣਾਉਣਾ।",
        motivation_muscle_title: "ਹਾਈਪਰਟ੍ਰੋਫੀ ਇੰਜਣ",
        motivation_muscle_sub: "ਫਾਈਬਰ ਦੇ ਵਿਕਾਸ ਨੂੰ ਵਧਾਉਣ ਲਈ ਮਕੈਨੀਕਲ ਤਣਾਅ 'ਤੇ ਧਿਆਨ ਕੇਂਦਰਤ ਕਰਨਾ।",
        motivation_diet_title: "ਮੈਟਾਬੋਲਿਕ ਰੀਸੈਟ",
        motivation_diet_sub: "ਸਥਿਰਤਾ ਲਈ ਤੁਹਾਡੇ ਕੈਲੋਰੀ ਦੀ ਮਾਤਰਾ ਨੂੰ ਅਨੁਕੂਲਿਤ ਕਰਨਾ।",
        motivation_stress_title: "ਤਣਾਅ ਪ੍ਰਬੰਧਨ",
        motivation_stress_sub: "ਸਰੀਰਕ ਤਬਦੀਲੀ ਲਈ ਤਣਾਅ ਦੇ ਹਾਰਮੋਨਾਂ ਨੂੰ ਨਿਯੰਤ੍ਰਿਤ ਕਰਨਾ ਮੁੱਖ ਹੈ।",
        motivation_active_title: "ਗਤੀਵਿਧੀ ਦੀ ਮਾਤਰਾ",
        motivation_active_sub: "ਆਪਣੀ ਰੋਜ਼ਾਨਾ ਗਤੀਵਿਧੀ ਨੂੰ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਵਧਾਉਣਾ।",
        ps_message: 'P.S. ਤੁਸੀਂ ਸਭ ਤੋਂ ਔਖਾ ਕੰਮ ਪਹਿਲਾਂ ਹੀ ਕਰ ਲਿਆ ਹੈ: ਸ਼ੁਰੂਆਤ ਕਰਨਾ 🥳',

        // Step 4: Biometrics
        step4_title: 'ਸਾਨੂੰ ਆਪਣੇ ਬਾਰੇ ਦੱਸੋ',
        step4_subtitle: 'ਇਹ ਤੁਹਾਡੀ ਯੋਜਨਾ ਨੂੰ ਨਿੱਜੀ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।',
        gender_male: 'ਪੁਰਸ਼',
        gender_female: 'ਔਰਤ',
        gender_other: 'ਹੋਰ',
        age_label: 'ਉਮਰ',
        years_old: 'ਸਾਲ',

        // Step 5: Metrics
        step5_title: 'ਤੁਹਾਡੇ ਸਰੀਰ ਦੇ ਮਾਪ',
        step5_subtitle: 'ਤੁਹਾਡੀ ਪਾਚਨ ਦਰ (metabolic rate) ਲਈ ਜ਼ਰੂਰੀ।',
        label_height: 'ਕੱਦ (Height)',
        label_weight: 'ਭਾਰ (Weight)',
        unit_cm: 'ਸੈ.ਮੀ.',
        unit_kg: 'ਕਿਲੋ',

        // Step 6: Target
        step6_title: 'ਸਫਲਤਾ ਕੀ ਹੈ?',
        step6_subtitle: 'ਇੱਕ ਯਥਾਰਥਵਾਦੀ ਟੀਚਾ ਸੈਟ ਕਰੋ।',
        target_weight_label: 'ਟੀਚਾ ਭਾਰ',
        current_weight: 'ਮੌਜੂਦਾ',

        // Step 7: Activity
        step_activity_header: "ਗਤੀਵਿਧੀ",
        step_activity_title: "ਤੁਹਾਡਾ ਰੋਜ਼ਾਨਾ ਅਨੁਸੂਚੀ।",
        step_activity_subtitle: "ਤੁਸੀਂ ਇਸ ਸਮੇਂ ਕਿੰਨੇ ਸਰਗਰਮ ਹੋ?",
        activity_sedentary: "ਬੈਠਣ ਵਾਲਾ ਕੰਮ",
        desc_sedentary: "ਥੋੜ੍ਹੀ ਜਾਂ ਕੋਈ ਕਸਰਤ ਨਹੀਂ",
        activity_light: "ਹਲਕਾ ਸਰਗਰਮ",
        desc_light: "ਹਫ਼ਤੇ ਵਿੱਚ 1-3 ਵਾਰ ਕਸਰਤ",
        activity_active: "ਸਰਗਰਮ",
        desc_active: "ਹਫ਼ਤੇ ਵਿੱਚ 3-5 ਵਾਰ ਕਸਰਤ",
        activity_very: "ਬਹੁਤ ਸਰਗਰਮ",
        desc_very: "ਹਫ਼ਤੇ ਵਿੱਚ 6-7 ਦਿਨ ਸਖਤ ਕਸਰਤ",

        // Step 8: Diet Type
        step_diet_title: "ਖਾਣੇ ਦੀ ਪਸੰਦ",
        step_diet_subtitle: "ਕੀ ਤੁਸੀਂ ਮੀਟ ਖਾਂਦੇ ਹੋ?",
        step_diet_desc: "ਇਹ ਸਾਨੂੰ ਸਹੀ ਪ੍ਰੋਟੀਨ ਸਰੋਤ ਦੱਸਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
        diet_vegetarian: "ਸ਼ਾਕਾਹਾਰੀ",
        diet_vegetarian_desc: "ਕੋਈ ਮੀਟ ਨਹੀਂ, ਅੰਡੇ ਵਿਕਲਪਿਕ",
        diet_non_vegetarian: "ਮਾਸਾਹਾਰੀ",
        diet_non_vegetarian_desc: "ਮੈਂ ਸਭ ਕੁਝ ਖਾਂਦਾ ਹਾਂ",
        diet_eggetarian: "ਅੰਡੇ ਵਾਲਾ ਸ਼ਾਕਾਹਾਰੀ",
        diet_eggetarian_desc: "ਸਬਜ਼ੀਆਂ + ਅੰਡੇ",
        diet_vegan: "ਵੀਗਨ",
        diet_vegan_desc: "ਕੋਈ ਜਾਨਵਰ ਉਤਪਾਦ ਨਹੀਂ",


        // Step 8: Barriers
        step8_title: "ਕੋਈ ਰੁਕਾਵਟਾਂ?",
        step8_subtitle: "ਕੀ ਕੋਈ ਖਾਸ ਆਦਤਾਂ ਹਨ ਜਿਨ੍ਹਾਂ ਨੂੰ ਅਸੀਂ ਸੁਧਾਰ ਸਕਦੇ ਹਾਂ?",
        barrier_snacking: "ਦੇਰ ਰਾਤ ਖਾਣਾ",
        barrier_sugar: "ਮਿੱਠੇ ਦੀ ਤਲਬ",
        barrier_stress: "ਤਣਾਅ ਵਿੱਚ ਖਾਣਾ",
        barrier_time: "ਸਮੇਂ ਦੀ ਕਮੀ",
        barrier_cooking: "ਖਾਣਾ ਬਣਾਉਣ ਵਿੱਚ ਔਖ",
        barrier_social: "ਸਮਾਜਿਕ ਸਮਾਗਮ",
        barrier_metabolism: "ਹੌਲੀ ਪਾਚਨ ਕਿਰਿਆ",
        barrier_sleep: "ਨੀਂਦ ਦੀ ਕਮੀ",
        barrier_motivation: "ਹੌਸਲਾ ਘਟਣਾ",
        toast_got_it: "ਸਮਝ ਗਏ।",
        toast_strategy: "ਅਸੀਂ ਇਸ ਲਈ ਇੱਕ ਯੋਜਨਾ ਬਣਾਵਾਂਗੇ।",

        // Step 9: Pledge
        step9_title: "ਵਚਨਬੱਧਤਾ।",
        step9_subtitle: "ਤੁਸੀਂ ਹਫ਼ਤੇ ਵਿੱਚ ਕਿੰਨੇ ਦਿਨ ਦੇ ਸਕਦੇ ਹੋ?",
        pledge_gentle: "ਹਲਕੀ ਸ਼ੁਰੂਆਤ 🌱",
        pledge_habits: "ਆਦਤਾਂ ਬਣਾਉਣਾ 🏗️",
        pledge_results: "ਵਧੀਆ ਨਤੀਜੇ 🔥",
        pledge_beast: "ਪੂਰਾ ਜ਼ੋਰ 🦍",
        pledge_select: "ਦਿਨ ਚੁਣੋ",
        pledge_button: "ਮੈਂ ਵਾਅਦਾ ਕਰਦਾ ਹਾਂ ✋",
        days_short: "ਸ,ਮ,ਬ,ਵ,ਸ਼,ਸ਼,ਐ",

        // Step 10: Processing
        analyzing_profile: "ਪ੍ਰੋਫਾਈਲ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ...",
        crafting_meals: "ਸੁਆਦੀ ਭੋਜਨ ਤਿਆਰ ਕੀਤੇ ਜਾ ਰਹੇ ਹਨ...",
        waiting_title: "ਯੋਜਨਾ ਤਿਆਰ ਹੋ ਰਹੀ ਹੈ",
        waiting_subtitle: "ਸਾਡੇ ਮਾਹਰ ਤੁਹਾਡੇ ਵੇਰਵਿਆਂ ਦੀ ਜਾਂਚ ਕਰ ਰਹੇ ਹਨ। ਇਸ ਵਿੱਚ 5-10 ਮਿੰਟ ਲੱਗ ਸਕਦੇ ਹਨ।",
        time_remaining: "ਬਾਕੀ ਸਮਾਂ",
        waiting_note: "ਤੁਸੀਂ ਐਪ ਬੰਦ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਵਾਪਸ ਆ ਸਕਦੇ ਹੋ।",
        plan_ready: "ਤੁਹਾਡੀ ਯੋਜਨਾ ਤਿਆਰ ਹੈ!",
        view_plan: "ਯੋਜਨਾ ਦੇਖੋ",

        // Dashboard
        greeting_morning: 'ਸ਼ੁਭ ਸਵੇਰ',
        greeting_afternoon: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ',
        greeting_evening: 'ਸ਼ੁਭ ਸ਼ਾਮ',
        todays_plan: 'ਅੱਜ ਦੀ ਯੋਜਨਾ',
        calories: 'ਕੈਲੋਰੀ',
        protein: 'ਪ੍ਰੋਟੀਨ',
        carbs: 'ਕਾਰਬਸ',
        fats: 'ਫੈਟ',
    },
} as const;

export type TranslationKey = keyof (typeof translations)['en'];
export type Translations = typeof translations;

/**
 * Get translation for a specific key
 */
export function getTranslation(language: Language, key: TranslationKey): string {
    return translations[language][key] || translations['en'][key] || key;
}
