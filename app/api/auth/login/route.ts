import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, plans, pushUpAttempts } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber } = await request.json();

        if (!phoneNumber) {
            return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
        }

        // Find user by mobile
        const user = await db.query.users.findFirst({
            where: eq(users.mobile, phoneNumber)
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }

        // Find associated plan
        const plan = await db.query.plans.findFirst({
            where: eq(plans.userId, user.id),
            orderBy: (plans, { desc }) => [desc(plans.createdAt)]
        });

        // Calculate points dynamically
        const pointsResult = await db
            .select({
                totalReps: sql<number>`sum(${pushUpAttempts.repCount})`
            })
            .from(pushUpAttempts)
            .where(
                and(
                    eq(pushUpAttempts.userId, phoneNumber),
                    eq(pushUpAttempts.status, 'approved')
                )
            );

        const totalReps = Number(pointsResult[0]?.totalReps) || 0;
        const points = totalReps * 2.5;

        return NextResponse.json({
            success: true,
            user: {
                id: user.mobile, // Use mobile as the client-side ID for consistency with localstorage logic
                name: user.name,
                onboardingData: user.onboardingData,
                points: points
            },
            plan: plan ? plan.planData : null
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
