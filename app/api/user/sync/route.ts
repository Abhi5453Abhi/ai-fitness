import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, pushUpAttempts } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: "UserId required" }, { status: 400 });
        }

        // Calculate points dynamically from approved attempts
        // 1 Rep = 2.5 Points
        const result = await db
            .select({
                totalReps: sql<number>`sum(${pushUpAttempts.repCount})`
            })
            .from(pushUpAttempts)
            .where(
                and(
                    eq(pushUpAttempts.userId, userId),
                    eq(pushUpAttempts.status, 'approved')
                )
            );

        const totalReps = Number(result[0]?.totalReps) || 0;
        const calculatedPoints = totalReps * 2.5;

        return NextResponse.json({
            success: true,
            points: calculatedPoints
        });
    } catch (error) {
        console.error("Sync Error:", error);
        return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
    }
}
