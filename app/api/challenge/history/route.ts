import { NextResponse } from 'next/server';
import { db } from '@/db';
import { pushUpAttempts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: "UserId required" }, { status: 400 });
        }

        const history = await db.select()
            .from(pushUpAttempts)
            .where(eq(pushUpAttempts.userId, userId))
            .orderBy(desc(pushUpAttempts.createdAt));

        return NextResponse.json(history);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
}
