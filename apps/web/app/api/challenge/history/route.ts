import { NextResponse } from 'next/server';
import { db } from '@/db';
import { pushUpAttempts } from '@/db/schema';
import { eq, desc, and, gte } from 'drizzle-orm';

// Get start of today in IST (UTC+5:30)
function getTodayStartIST(): Date {
    const now = new Date();
    // Convert to IST
    const istOffset = 5.5 * 60 * 60 * 1000; // 5:30 hours in ms
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const istTime = new Date(utcTime + istOffset);

    // Get start of day in IST
    istTime.setHours(0, 0, 0, 0);

    // Convert back to UTC for database comparison
    const utcMidnightIST = new Date(istTime.getTime() - istOffset);
    return utcMidnightIST;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const allTime = searchParams.get('allTime') === 'true'; // For full history view

        if (!userId) {
            return NextResponse.json({ error: "UserId required" }, { status: 400 });
        }

        // Get today's start in IST (for daily attempt limit)
        const todayStart = getTodayStartIST();

        let history;
        if (allTime) {
            // Full history for display purposes
            history = await db.select()
                .from(pushUpAttempts)
                .where(eq(pushUpAttempts.userId, userId))
                .orderBy(desc(pushUpAttempts.createdAt));
        } else {
            // Only today's attempts (for daily limit counting)
            history = await db.select()
                .from(pushUpAttempts)
                .where(
                    and(
                        eq(pushUpAttempts.userId, userId),
                        gte(pushUpAttempts.createdAt, todayStart)
                    )
                )
                .orderBy(desc(pushUpAttempts.createdAt));
        }

        return NextResponse.json(history);
    } catch (error) {
        console.error("Error fetching history:", error);
        return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
}
