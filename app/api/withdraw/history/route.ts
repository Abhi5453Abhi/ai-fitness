import { NextResponse } from 'next/server';
import { db } from '@/db';
import { withdrawals } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: "UserId required" }, { status: 400 });
    }

    const history = await db.select()
        .from(withdrawals)
        .where(eq(withdrawals.userId, userId))
        .orderBy(desc(withdrawals.requestedAt));

    return NextResponse.json(history);
}
