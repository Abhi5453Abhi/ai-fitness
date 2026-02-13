import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, pushUpAttempts, pointsTransactions } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: "UserId required" }, { status: 400 });
        }

        // Calculate earned points from approved attempts
        // 1 Rep = 2.5 Points
        const result = await db
            .select({
                totalReps: sql<number>`sum(${pushUpAttempts.repCount})`
            })
            .from(pushUpAttempts)
            .where(eq(pushUpAttempts.userId, userId));

        const totalReps = Number(result[0]?.totalReps) || 0;
        const earnedPoints = totalReps * 2.5;

        // Calculate withdrawn points from pointsTransactions
        const withdrawnResult = await db
            .select({
                total: sql<number>`sum(${pointsTransactions.points})`
            })
            .from(pointsTransactions)
            .where(and(
                eq(pointsTransactions.userId, userId),
                eq(pointsTransactions.type, 'withdraw')
            ));

        const withdrawnPoints = Number(withdrawnResult[0]?.total) || 0;
        const currentPoints = earnedPoints - withdrawnPoints;

        return NextResponse.json({
            success: true,
            points: currentPoints
        });
    } catch (error) {
        console.error("Sync Error:", error);
        return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
    }
}
