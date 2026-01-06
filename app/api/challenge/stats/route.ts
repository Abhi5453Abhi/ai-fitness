import { NextResponse } from 'next/server';
import { db } from '@/db';
import { pushUpAttempts } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
    try {
        // Count distinct users who have submitted an attempt
        const result = await db.select({
            count: sql<number>`count(distinct ${pushUpAttempts.userId})`
        }).from(pushUpAttempts);

        const participantCount = Number(result[0]?.count) || 0;

        return NextResponse.json({ participantCount });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ participantCount: 0 }, { status: 500 });
    }
}
