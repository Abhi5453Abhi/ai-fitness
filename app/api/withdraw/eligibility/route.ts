import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, withdrawals, pushUpAttempts, pointsTransactions } from '@/db/schema';
import { eq, and, sql, desc, gte } from 'drizzle-orm';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: "UserId required" }, { status: 400 });
    }

    // Calculate earned points
    const pointsResult = await db
        .select({ totalReps: sql<number>`sum(${pushUpAttempts.repCount})` })
        .from(pushUpAttempts)
        .where(eq(pushUpAttempts.userId, userId));
    
    const totalReps = Number(pointsResult[0]?.totalReps) || 0;
    const earnedPoints = totalReps * 2.5;

    // Calculate withdrawn points
    const withdrawnResult = await db
        .select({ total: sql<number>`sum(${pointsTransactions.points})` })
        .from(pointsTransactions)
        .where(and(
            eq(pointsTransactions.userId, userId),
            eq(pointsTransactions.type, 'withdraw')
        ));

    const withdrawnPoints = Number(withdrawnResult[0]?.total) || 0;
    const currentPoints = earnedPoints - withdrawnPoints;

    // Check for pending withdrawals
    const pendingWithdrawal = await db.query.withdrawals.findFirst({
        where: and(
            eq(withdrawals.userId, userId),
            eq(withdrawals.status, 'pending')
        )
    });

    // Check weekly limit - last completed withdrawal
    const lastWithdrawal = await db.query.withdrawals.findFirst({
        where: and(
            eq(withdrawals.userId, userId),
            eq(withdrawals.status, 'completed')
        ),
        orderBy: [desc(withdrawals.completedAt)]
    });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyLimitHit = lastWithdrawal && 
        lastWithdrawal.completedAt && 
        new Date(lastWithdrawal.completedAt) > oneWeekAgo;

    const eligible = currentPoints >= 1000 && !pendingWithdrawal && !weeklyLimitHit;

    return NextResponse.json({
        eligible,
        currentPoints,
        minimumRequired: 1000,
        hasPendingWithdrawal: !!pendingWithdrawal,
        weeklyLimitHit,
        nextEligibleDate: lastWithdrawal?.completedAt 
            ? new Date(new Date(lastWithdrawal.completedAt).getTime() + 7 * 24 * 60 * 60 * 1000)
            : null,
        maxWithdrawable: Math.floor(currentPoints / 1000) * 1000 // Multiples of 1000
    });
}
