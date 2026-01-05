'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pa';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: any;
}

const translations = {
    en: {
        // Login & Auth
        welcome_back: 'Welcome Back',
        enter_mobile: 'Enter your number to start your journey.',
        mobile_number: 'Mobile Number',
        login: 'Login',
        verify_code: 'Verify Code',
        sent_code_to: 'We sent a code to',
        enter_verification_code: 'Enter Verification Code',
        verify_and_login: 'Verify & Login',
        change_phone: 'Change Phone Number',
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
        name_placeholder: "Your Name",

        // Step 2: Goals
        step2_title: "What brings you here?",
        step2_subtitle: "Select up to 3 goals that matter to you.",
        goal_lose_weight: "Lose Weight",
        goal_gain_muscle: "Gain Muscle",
        goal_get_fit: "Get Fit",
        goal_manage_stress: "Manage Stress",
        goal_improve_sleep: "Improve Sleep",
        goal_increase_energy: "Increase Energy",

        // Step 3: Motivation
        step3_title: "What motivates you?",
        step3_subtitle: "Select what drives you the most.",
        motivation_health: "Long-term Health",
        motivation_appearance: "Look Better",
        motivation_strength: "Strength & Power",
        motivation_energy: "Daily Energy",
        motivation_confidence: "Self Confidence",

        // Step 3 Dynamic
        motivation_default_title: "Losing weight isn't always easy.",
        motivation_default_sub: "But we'll motivate you through the ups and downs.",
        motivation_synergy_title: "Ambitious. Complex. Achievable.",
        motivation_synergy_sub: "Most people pick one path. You've chosen to master multiple. We've built a protocol to harmonize them.",
        motivation_muscle_title: "Building strength takes patience.",
        motivation_muscle_sub: "We optimize your hypertrophy window so every rep counts.",
        motivation_diet_title: "Fueling your engine.",
        motivation_diet_sub: "It's not just about less food, it's about better fuel.",
        motivation_stress_title: "Finding your balance.",
        motivation_stress_sub: "Sustainable health resets in a calm mind.",
        motivation_active_title: "Momentum builds daily.",
        motivation_active_sub: "Small steps compound into massive change.",
        real_talk: "OK, real talk:",
        ps_message: "P.S. You've already done the hardest part: getting started 🥳",

        // Step 4: Biometrics (Gender/Age)
        step4_title: "Tell us about yourself",
        step4_subtitle: "This helps us personalize your plan.",
        gender_male: "Male",
        gender_female: "Female",
        gender_other: "Other",
        age_label: "Age",
        years_old: "years old",

        // Step 5: Metrics (Height/Weight)
        step5_title: "Your Body Metrics",
        step5_subtitle: "Used to calculate your metabolic rate.",
        label_height: "Height",
        label_weight: "Weight",
        unit_cm: "cm",
        unit_kg: "kg",

        // Step 6: Target
        step6_title: "What represents success?",
        step6_subtitle: "Set a realistic target weight.",
        target_weight_label: "Target Weight",
        current_weight: "Current",

        // Step 7: Rate
        step7_title: "How fast do you want to go?",
        step7_subtitle: "Sustainable progress is key.",
        rate_slow: "Slow & Steady (0.25 kg/week)",
        rate_recommended: "Recommended (0.5 kg/week)",
        rate_aggressive: "Aggressive (1 kg/week)",



        // Step 12: Habits
        step_habits_header: "Goals",
        step_habits_title: "Which healthy habits are most important to you?",
        section_recommended: "Recommended for you",
        section_more: "More healthy habits",
        personalize_note: "We use this to personalize your daily plan.",
        habit_protein: "Eat more protein",
        habit_meals: "Plan more meals",
        habit_prep: "Meal prep and cook",
        habit_fiber: "Eat more fiber",
        habit_move: "Move more",
        habit_workout: "Workout more",
        habit_track_nutrients: "Track nutrients",
        habit_track_calories: "Track calories",
        habit_track_macros: "Track macros",
        habit_mindfully: "Eat mindfully",
        habit_balanced: "Eat a balanced diet",
        habit_whole: "Eat whole foods",
        habit_veg: "Eat more vegetables",
        habit_fruit: "Eat more fruit",
        habit_water_more: "Drink more water",
        habit_sleep: "Prioritize sleep",
        habit_else: "Something else",
        habit_unsure: "I'm not sure",

        // Step 13: Activity
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


        // Step Rate (Weekly Goal)
        step_rate_title: "Goal",
        step_rate_subtitle: "What is your weekly goal?",
        rate_02: "Lose 0.2 kilograms per week",
        rate_05: "Lose 0.5 kilograms per week",
        rate_08: "Lose 0.8 kilograms per week",
        rate_10: "Lose 1 kilogram per week",
        recommended: "(Recommended)",

        // Step 6: Diet Type
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

        // Step 7: Current Food & Habits
        step_food_title: "Current Diet",
        step_food_subtitle: "What do you usually eat?",
        placeholder_breakfast: "e.g. Paratha, Toast...",
        placeholder_lunch: "e.g. Rice, Dal, Roti...",
        placeholder_dinner: "e.g. Salad, Khichdi...",
        label_habits: "Habits",
        habit_junk: "I eat junk food often",
        habit_milk: "I drink milk daily",
        habit_water: "I drink < 2L water",

        // Step Daily Routine
        step_routine_title: "Daily Routine",
        step_routine_subtitle: "Your Typical Day",
        step_routine_desc: "We'll time your meals around your schedule.",
        label_wake: "Wake Up Time",
        label_work: "Work/School Starts",
        label_sleep: "Sleep Time",

        // Step Health
        step_health_title: "Health & Safety",
        label_conditions: "Health Conditions",
        label_allergies: "Allergies / Do Not Eat",
        condition_diabetes: "Diabetes",
        condition_thyroid: "Thyroid",
        condition_pcos: "PCOS/PCOD",
        condition_cholesterol: "Cholesterol",
        condition_hypertension: "Hypertension",
        condition_none: "None",
        allergy_lactose: "Lactose",
        allergy_gluten: "Gluten",
        allergy_nuts: "Nuts",
        allergy_soy: "Soy",
        allergy_eggs: "Eggs",
        allergy_none: "None",

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
        days_short: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],

        // Step 10: Processing
        analyzing_profile: "Analyzing your profile...",
        crafting_meals: "Crafting delicious meals...",
        // Step Waiting
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
        view_full_plan: 'View Full Plan',
    },
    pa: {
        // Login & Auth
        welcome_back: 'ਜੀ ਆਇਆਂ ਨੂੰ',
        enter_mobile: 'ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਭਰੋ।',
        mobile_number: 'ਮੋਬਾਈਲ ਨੰਬਰ',
        login: 'ਲੌਗ ਇਨ',
        verify_code: 'ਕੋਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
        sent_code_to: 'ਅਸੀਂ ਕੋਡ ਭੇਜਿਆ ਹੈ',
        enter_verification_code: 'ਪੁਸ਼ਟੀਕਰਨ ਕੋਡ ਦਰਜ ਕਰੋ',
        verify_and_login: 'ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਲੌਗ ਇਨ ਕਰੋ',
        change_phone: 'ਫੋਨ ਨੰਬਰ ਬਦਲੋ',
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
        step1_title: "ਆਓ ਤੁਹਾਡੇ ਨਾਮ ਨਾਲ ਸ਼ੁਰੂ ਕਰੀਏ",
        step1_subtitle: "ਅਸੀਂ ਤੁਹਾਨੂੰ ਕੀ ਬੁਲਾਈਏ?",
        name_placeholder: "ਤੁਹਾਡਾ ਨਾਮ",

        // Step 2: Goals
        step2_title: "ਤੁਸੀਂ ਇੱਥੇ ਕਿਉਂ ਆਏ ਹੋ?",
        step2_subtitle: "ਕੋਈ ਵੀ 3 ਟੀਚੇ ਚੁਣੋ ਜੋ ਤੁਹਾਡੇ ਲਈ ਮਹੱਤਵਪੂਰਨ ਹਨ।",
        goal_lose_weight: "ਭਾਰ ਘਟਾਉਣਾ ਹੈ",
        goal_gain_muscle: "ਮਾਸਪੇਸ਼ੀਆਂ ਬਣਾਉਣੀਆ ਹਨ",
        goal_get_fit: "ਤੰਦਰੁਸਤ ਰਹਿਣਾ ਹੈ",
        goal_manage_stress: "ਤਣਾਅ ਘਟਾਉਣਾ ਹੈ",
        goal_improve_sleep: "ਨੀਂਦ ਸੁਧਾਰਨੀ ਹੈ",
        goal_increase_energy: "ਊਰਜਾ ਵਧਾਉਣੀ ਹੈ",

        // Step 3: Motivation
        step3_title: "ਤੁਹਾਨੂੰ ਕੀ ਪ੍ਰੇਰਿਤ ਕਰਦਾ ਹੈ?",
        step3_subtitle: "ਸਭ ਤੋਂ ਵੱਧ ਪ੍ਰੇਰਿਤ ਕਰਨ ਵਾਲੀ ਗੱਲ ਚੁਣੋ।",
        motivation_health: "ਲੰਬੀ ਉਮਰ ਦੀ ਸਿਹਤ",
        motivation_appearance: "ਵਧੀਆ ਦਿਖਣਾ",
        motivation_strength: "ਤਾਕਤ",
        motivation_energy: "ਰੋਜ਼ਾਨਾ ਊਰਜਾ",
        motivation_confidence: "ਸਵੈ-ਭਰੋਸਾ",

        // Step 3 Dynamic
        motivation_default_title: "ਭਾਰ ਘਟਾਉਣਾ ਹਮੇਸ਼ਾ ਆਸਾਨ ਨਹੀਂ ਹੁੰਦਾ।",
        motivation_default_sub: "ਪਰ ਅਸੀਂ ਹਰ ਉਤਰਾਅ-ਚੜ੍ਹਾਅ ਵਿੱਚ ਤੁਹਾਡੀ ਹੌਸਲਾ ਅਫਜ਼ਾਈ ਕਰਾਂਗੇ।",
        motivation_synergy_title: "ਮਹੱਤਵਪੂਰਨ। ਗੁੰਝਲਦਾਰ। ਪ੍ਰਾਪਤ ਕਰਨ ਯੋਗ।",
        motivation_synergy_sub: "ਜ਼ਿਆਦਾਤਰ ਲੋਕ ਇੱਕ ਰਸਤਾ ਚੁਣਦੇ ਹਨ। ਤੁਸੀਂ ਕਈ ਚੁਣੇ ਹਨ। ਅਸੀਂ ਉਨ੍ਹਾਂ ਨੂੰ ਸੰਤੁਲਿਤ ਕਰਨ ਲਈ ਇੱਕ ਤਰੀਕਾ ਬਣਾਇਆ ਹੈ।",
        motivation_muscle_title: "ਤਾਕਤ ਬਣਾਉਣ ਵਿੱਚ ਸਮਾਂ ਲੱਗਦਾ ਹੈ।",
        motivation_muscle_sub: "ਅਸੀਂ ਤੁਹਾਡੀ ਮਾਸਪੇਸ਼ੀ ਵਿਕਾਸ ਨੂੰ ਅਨੁਕੂਲ ਬਣਾਉਂਦੇ ਹਾਂ ਤਾਂ ਜੋ ਹਰ ਕਸਰਤ ਗਿਣੀ ਜਾਵੇ।",
        motivation_diet_title: "ਤੁਹਾਡੇ ਇੰਜਣ ਨੂੰ ਊਰਜਾ ਦੇਣਾ।",
        motivation_diet_sub: "ਇਹ ਸਿਰਫ਼ ਘੱਟ ਖਾਣ ਬਾਰੇ ਨਹੀਂ ਹੈ, ਇਹ ਬਿਹਤਰ ਊਰਜਾ ਬਾਰੇ ਹੈ।",
        motivation_stress_title: "ਸੰਤੁਲਨ ਲੱਭਣਾ।",
        motivation_stress_sub: "ਟਿਕਾਊ ਸਿਹਤ ਸ਼ਾਂਤ ਮਨ ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ।",
        motivation_active_title: "ਰੋਜ਼ਾਨਾ ਗਤੀ ਵਧਦੀ ਹੈ।",
        motivation_active_sub: "ਛੋਟੇ ਕਦਮ ਵੱਡੀਆਂ ਤਬਦੀਲੀਆਂ ਲਿਆਉਂਦੇ ਹਨ।",
        real_talk: "ਸੱਚੀ ਗੱਲ:",
        ps_message: "P.S. ਤੁਸੀਂ ਸਭ ਤੋਂ ਔਖਾ ਕੰਮ ਪਹਿਲਾਂ ਹੀ ਕਰ ਲਿਆ ਹੈ: ਸ਼ੁਰੂਆਤ ਕਰਨਾ 🥳",

        // Step 4: Biometrics
        step4_title: "ਸਾਨੂੰ ਆਪਣੇ ਬਾਰੇ ਦੱਸੋ",
        step4_subtitle: "ਇਹ ਤੁਹਾਡੀ ਯੋਜਨਾ ਨੂੰ ਨਿੱਜੀ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
        gender_male: "ਪੁਰਸ਼",
        gender_female: "ਔਰਤ",
        gender_other: "ਹੋਰ",
        age_label: "ਉਮਰ",
        years_old: "ਸਾਲ",

        // Step 5: Metrics
        step5_title: "ਤੁਹਾਡੇ ਸਰੀਰ ਦੇ ਮਾਪ",
        step5_subtitle: "ਤੁਹਾਡੀ ਪਾਚਨ ਦਰ (metabolic rate) ਲਈ ਜ਼ਰੂਰੀ।",
        label_height: "ਕੱਦ (Height)",
        label_weight: "ਭਾਰ (Weight)",
        unit_cm: "ਸੈ.ਮੀ.",
        unit_kg: "ਕਿਲੋ",

        // Step 6: Target
        step6_title: "ਸਫਲਤਾ ਕੀ ਹੈ?",
        step6_subtitle: "ਇੱਕ ਯਥਾਰਥਵਾਦੀ ਟੀਚਾ ਸੈਟ ਕਰੋ।",
        target_weight_label: "ਟੀਚਾ ਭਾਰ",
        current_weight: "ਮੌਜੂਦਾ",

        // Step 7: Rate
        step7_title: "ਤੁਸੀਂ ਕਿੰਨੀ ਤੇਜ਼ੀ ਨਾਲ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
        step7_subtitle: "ਟਿਕਾਊ ਤਰੱਕੀ ਕੁੰਜੀ ਹੈ।",
        rate_slow: "ਹੌਲੀ ਅਤੇ ਸਥਿਰ (0.25 ਕਿਲੋ/ਹਫ਼ਤਾ)",
        rate_recommended: "ਸਿਫਾਰਸ਼ ਕੀਤੀ (0.5 ਕਿਲੋ/ਹਫ਼ਤਾ)",
        rate_aggressive: "ਤੇਜ਼ (1 ਕਿਲੋ/ਹਫ਼ਤਾ)",



        // Step 12: Habits
        step_habits_header: "ਟੀਚੇ",
        step_habits_title: "ਕਿਹੜੀਆਂ ਸਿਹਤਮੰਦ ਆਦਤਾਂ ਤੁਹਾਡੇ ਲਈ ਸਭ ਤੋਂ ਮਹੱਤਵਪੂਰਨ ਹਨ?",
        section_recommended: "ਤੁਹਾਡੇ ਲਈ ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ",
        section_more: "ਹੋਰ ਸਿਹਤਮੰਦ ਆਦਤਾਂ",
        personalize_note: "ਅਸੀਂ ਇਸਦੀ ਵਰਤੋਂ ਤੁਹਾਡੀ ਰੋਜ਼ਾਨਾ ਯੋਜਨਾ ਨੂੰ ਨਿੱਜੀ ਬਣਾਉਣ ਲਈ ਕਰਦੇ ਹਾਂ।",
        habit_protein: "ਵਧੇਰੇ ਪ੍ਰੋਟੀਨ ਖਾਓ",
        habit_meals: "ਹੋਰ ਭੋਜਨ ਦੀ ਯੋਜਨਾ ਬਣਾਓ",
        habit_prep: "ਭੋਜਨ ਤਿਆਰ ਕਰੋ ਅਤੇ ਪਕਾਓ",
        habit_fiber: "ਵਧੇਰੇ ਫਾਈਬਰ ਖਾਓ",
        habit_move: "ਹੋਰ ਹਿਲਾਓ ਜੁਲਾਓ",
        habit_workout: "ਹੋਰ ਕਸਰਤ ਕਰੋ",
        habit_track_nutrients: "ਪੌਸ਼ਟਿਕ ਤੱਤ ਟ੍ਰੈਕ ਕਰੋ",
        habit_track_calories: "ਕੈਲੋਰੀ ਟ੍ਰੈਕ ਕਰੋ",
        habit_track_macros: "ਮੈਕਰੋ ਟ੍ਰੈਕ ਕਰੋ",
        habit_mindfully: "ਧਿਆਨ ਨਾਲ ਖਾਓ",
        habit_balanced: "ਸੰਤੁਲਿਤ ਖੁਰਾਕ ਖਾਓ",
        habit_whole: "ਸਾਬਤ ਅਨਾਜ ਖਾਓ",
        habit_veg: "ਵਧੇਰੇ ਸਬਜ਼ੀਆਂ ਖਾਓ",
        habit_fruit: "ਵਧੇਰੇ ਫਲ ਖਾਓ",
        habit_water_more: "ਹੋਰ ਪਾਣੀ ਪੀਓ",
        habit_sleep: "ਨੀਂਦ ਨੂੰ ਤਰਜੀਹ ਦਿਓ",
        habit_else: "ਕੁਝ ਹੋਰ",
        habit_unsure: "ਮੈਨੂੰ ਯਕੀਨ ਨਹੀਂ ਹੈ",

        // Step 13: Activity
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


        // Step Rate (Weekly Goal)
        step_rate_title: "ਟੀਚਾ",
        step_rate_subtitle: "ਤੁਹਾਡਾ ਹਫ਼ਤਾਵਾਰੀ ਟੀਚਾ ਕੀ ਹੈ?",
        rate_02: "ਹਰ ਹਫ਼ਤੇ 0.2 ਕਿਲੋ ਘਟਾਓ",
        rate_05: "ਹਰ ਹਫ਼ਤੇ 0.5 ਕਿਲੋ ਘਟਾਓ",
        rate_08: "ਹਰ ਹਫ਼ਤੇ 0.8 ਕਿਲੋ ਘਟਾਓ",
        rate_10: "ਹਰ ਹਫ਼ਤੇ 1 ਕਿਲੋ ਘਟਾਓ",
        recommended: "(ਸਿਫਾਰਸ਼ੀ)",

        // Step 6: Diet Type
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

        // Step 7: Current Food & Habits
        step_food_title: "ਮੌਜੂਦਾ ਖੁਰਾਕ",
        step_food_subtitle: "ਤੁਸੀਂ ਆਮ ਤੌਰ 'ਤੇ ਕੀ ਖਾਂਦੇ ਹੋ?",
        placeholder_breakfast: "ਜਿਵੇਂ ਪਰਾਂਠਾ, ਟੋਸਟ...",
        placeholder_lunch: "ਜਿਵੇਂ ਚੌਲ, ਦਾਲ, ਰੋਟੀ...",
        placeholder_dinner: "ਜਿਵੇਂ ਸਲਾਦ, ਖਿਚੜੀ...",
        label_habits: "ਆਦਤਾਂ",
        habit_junk: "ਮੈਂ ਅਕਸਰ ਜੰਕ ਫੂਡ ਖਾਂਦਾ ਹਾਂ",
        habit_milk: "ਮੈਂ ਰੋਜ਼ ਦੁੱਧ ਪੀਂਦਾ ਹਾਂ",
        habit_water: "ਮੈਂ 2 ਲੀਟਰ ਤੋਂ ਘੱਟ ਪਾਣੀ ਪੀਂਦਾ ਹਾਂ",

        // Step Daily Routine
        step_routine_title: "ਰੋਜ਼ਾਨਾ ਰੁਟੀਨ",
        step_routine_subtitle: "ਤੁਹਾਡਾ ਆਮ ਦਿਨ",
        step_routine_desc: "ਅਸੀਂ ਤੁਹਾਡੇ ਖਾਣੇ ਦਾ ਸਮਾਂ ਤੈਅ ਕਰਾਂਗੇ।",
        label_wake: "ਉੱਠਣ ਦਾ ਸਮਾਂ",
        label_work: "ਕੰਮ/ਸਕੂਲ ਸ਼ੁਰੂ ਹੋਣ ਦਾ ਸਮਾਂ",
        label_sleep: "ਸੌਣ ਦਾ ਸਮਾਂ",

        // Step Health
        step_health_title: "ਸਿਹਤ ਅਤੇ ਸੁਰੱਖਿਆ",
        label_conditions: "ਸਿਹਤ ਸਮੱਸਿਆਵਾਂ",
        label_allergies: "ਐਲਰਜੀ / ਕੀ ਨਹੀਂ ਖਾਣਾ",
        condition_diabetes: "ਸ਼ੂਗਰ (Diabetes)",
        condition_thyroid: "ਥਾਈਰੋਇਡ (Thyroid)",
        condition_pcos: "ਪੀ.ਸੀ.ਓ.ਐਸ (PCOS)",
        condition_cholesterol: "ਕੋਲੈਸਟਰੋਲ",
        condition_hypertension: "ਹਾਈ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ",
        condition_none: "ਕੋਈ ਨਹੀਂ",
        allergy_lactose: "ਲੈਕਟੋਜ਼ (ਦੁੱਧ)",
        allergy_gluten: "ਗਲੂਟਨ (ਕਣਕ)",
        allergy_nuts: "ਮੇਵੇ",
        allergy_soy: "ਸੋਇਆ",
        allergy_eggs: "ਅੰਡੇ",
        allergy_none: "ਕੋਈ ਨਹੀਂ",

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
        days_short: ['ਸ', 'ਮ', 'ਬ', 'ਵ', 'ਸ਼', 'ਸ਼', 'ਐ'],

        // Step 10: Processing
        analyzing_profile: "ਪ੍ਰੋਫਾਈਲ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ...",
        crafting_meals: "ਸੁਆਦੀ ਭੋਜਨ ਤਿਆਰ ਕੀਤੇ ਜਾ ਰਹੇ ਹਨ...",
        // Step Waiting
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
        todays_plan: "ਅੱਜ ਦੀ ਯੋਜਨਾ",
        calories: 'ਕੈਲੋਰੀ',
        protein: 'ਪ੍ਰੋਟੀਨ',
        carbs: 'ਕਾਰਬਸ',
        fats: 'ਫੈਟ',
        view_full_plan: 'ਪੂਰੀ ਯੋਜਨਾ ਦੇਖੋ',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('app-language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'pa')) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app-language', lang);
        // Also update HTML lang attribute (optional but good practice)
        document.documentElement.lang = lang;
    };

    const value = {
        language,
        setLanguage,
        t: translations[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
