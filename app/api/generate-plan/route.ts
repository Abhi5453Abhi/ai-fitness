interface UserRequest {
    name: string
    age: number
    gender: string
    height: number
    weight: number
    targetWeight: number
    weeklyRate: string
    habits: string[]
    selectedGoals: string[]
    activityLevel: string
    barriers: string[]
    pledgeDays: number
    dietType: string
    wakeTime: string
    workTime: string
    sleepTime: string
    currentBreakfast: string
    currentLunch: string
    currentDinner: string
    junkFood: boolean
    milkIntake: boolean
    waterIntake: boolean
    healthIssues: string[]
    allergies: string[]
    language?: 'en' | 'pa'
    userId: string
}

interface Meal {
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
    description: string
}

interface DailyPlan {
    calories: number
    protein: number
    carbs: number
    fat: number
    meals: {
        breakfast: Meal
        lunch: Meal
        dinner: Meal
        snack: Meal
    }
}

interface AIPlanResponse {
    message: string
    goalSummary: string
    weeklyPlan: Record<string, DailyPlan> // "Day 1", "Day 2", etc.
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, plans } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const req: UserRequest = await request.json()

        const apiKey = process.env.OPENAI_API_KEY
        let plan: AIPlanResponse;

        if (!apiKey) {
            const mockDay: DailyPlan = {
                calories: 2200, protein: 150, carbs: 200, fat: 70,
                meals: {
                    breakfast: { name: 'Paneer Paratha', calories: 500, protein: 20, carbs: 60, fat: 20, description: '2 parathas with curd' },
                    lunch: { name: 'Rajma Chawal', calories: 700, protein: 25, carbs: 90, fat: 25, description: 'Bowl of rice with kidney beans curry' },
                    dinner: { name: 'Roti with Mixed Veg', calories: 600, protein: 15, carbs: 70, fat: 20, description: '3 rotis with seasonal vegetables' },
                    snack: { name: 'Roasted Chana', calories: 200, protein: 10, carbs: 30, fat: 5, description: 'Handful of roasted chickpeas' }
                }
            }

            plan = {
                message: 'This is a mocked 7-day plan.',
                goalSummary: 'Weekly Transformation',
                weeklyPlan: {
                    "Day 1": mockDay, "Day 2": mockDay, "Day 3": mockDay, "Day 4": mockDay,
                    "Day 5": mockDay, "Day 6": mockDay, "Day 7": mockDay
                }
            }
        } else {
            const languageInstruction = req.language === 'pa'
                ? "IMPORTANT: Output all values (name, description, message, goalSummary) in Punjabi (Gurmukhi script). Keep JSON keys in English."
                : "Output all text in English.";

            // Construct prompt for OpenAI
            const prompt = `
          Act as an expert nutritionist specializing in Indian cuisine. Generate a 7-DAY Meal Plan JSON for this user:
          
          **Profile:**
          Name: ${req.name}
          Details: ${req.age}yo, ${req.gender}, ${req.height}cm, ${req.weight}kg
          Target: ${req.targetWeight}kg (${req.weeklyRate})
          Diet Preference: ${req.dietType.toUpperCase()} (STRICTLY FOLLOW)
          
          **Schedule:**
          Wake: ${req.wakeTime}, Work: ${req.workTime}, Sleep: ${req.sleepTime}
          
          **Health & Habits:**
          Health Issues: ${req.healthIssues.join(', ')}
          Allergies: ${req.allergies.join(', ')} (STRICTLY AVOID)
          Current Diet: B: ${req.currentBreakfast}, L: ${req.currentLunch}, D: ${req.currentDinner}
          Junk Food Habit: ${req.junkFood ? 'Yes' : 'No'}
          Milk Intake: ${req.milkIntake ? 'Yes' : 'No'}
          Low Water Intake: ${req.waterIntake ? 'Yes (<2L)' : 'No (>3L)'}
          Other Habits: ${req.habits.join(', ')}
          Barriers: ${req.barriers.join(', ')}
          Goals: ${req.selectedGoals.join(', ')}
          Activity: ${req.activityLevel}
    
          **Instructions:**
          1. Strictly adhere to Diet Preference (${req.dietType}).
          2. If Diabetic, avoid sugar. If PCOD, avoid high GI. If Hypertensive, low sodium.
          3. AVOID ALLERGENS: ${req.allergies.join(', ')}.
          4. Plan meal timings based on Wake/Sleep schedule in description.
          5. Provide variety across 7 days.
          6. ${languageInstruction}
    
          Return ONLY a JSON object with this EXACT structure:
          {
            "message": "A short, punchy 1-sentence motivational summary.",
            "goalSummary": "A very short 2-3 word summary e.g. 'Aggressive Cut'",
            "weeklyPlan": {
               "Day 1": {
                   "calories": 2200, "protein": 150, "carbs": 200, "fat": 70,
                   "meals": {
                      "breakfast": { "name": "...", "calories": 500, "protein": 30, "carbs": 50, "fat": 20, "description": "..." },
                      "lunch": { "name": "...", "calories": 700, "protein": 40, "carbs": 80, "fat": 25, "description": "..." },
                      "dinner": { "name": "...", "calories": 600, "protein": 35, "carbs": 60, "fat": 20, "description": "..." },
                      "snack": { "name": "...", "calories": 300, "protein": 15, "carbs": 30, "fat": 10, "description": "..." }
                   }
               },
               "Day 2": { ... },
               "Day 3": { ... },
               "Day 4": { ... },
               "Day 5": { ... },
               "Day 6": { ... },
               "Day 7": { ... }
            }
          }
          
          Requirements:
          1. Strictly Indian Vegetarian/Non-Vegetarian based on habits.
          2. VARIETY: Limit repetition between days. Don't give "Oats" every day for breakfast.
          3. Total macros should align with goals.
        `

            // Call OpenAI API
            const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: 'You are a precise nutrition API that outputs only JSON.' },
                        { role: 'user', content: prompt },
                    ],
                }),
            })

            if (!openAIResponse.ok) {
                const errorText = await openAIResponse.text()
                console.error('OpenAI API error:', errorText)
                return NextResponse.json({ error: 'Failed to call AI' }, { status: 500 })
            }

            const data = await openAIResponse.json()

            if (!data.choices || data.choices.length === 0) {
                return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
            }

            let content = data.choices[0].message.content

            // Clean markdown block if present
            content = content.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()

            // Parse and return the plan
            plan = JSON.parse(content)
        }

        // Save to Database
        try {
            // 1. Get User ID (integer)
            // We assume user is already created by the /api/user/profile call
            const userRecord = await db.query.users.findFirst({
                where: eq(users.mobile, req.userId)
            });

            if (userRecord) {
                // 2. Save Plan
                await db.insert(plans).values({
                    userId: userRecord.id,
                    planData: plan as any // Cast JSON
                });
            } else {
                console.error("User not found for plan saving:", req.userId);
            }
        } catch (dbError) {
            console.error("Database Save Error:", dbError);
            // Don't fail the request if DB save fails, just log it.
        }

        return NextResponse.json(plan)
    } catch (error) {
        console.error('Error generating plan:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
