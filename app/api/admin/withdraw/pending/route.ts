import { NextResponse } from 'next/server';
import { db } from '@/db';
import { withdrawals } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
    const pending = await db.select()
        .from(withdrawals)
        .where(eq(withdrawals.status, 'pending'))
        .orderBy(desc(withdrawals.requestedAt));

    return NextResponse.json(pending);
}
