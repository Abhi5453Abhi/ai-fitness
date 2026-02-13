import { NextResponse } from 'next/server';
import { db } from '@/db';
import { withdrawals } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const allWithdrawals = status
        ? await db.select()
            .from(withdrawals)
            .where(eq(withdrawals.status, status as any))
            .orderBy(desc(withdrawals.requestedAt))
        : await db.select()
            .from(withdrawals)
            .orderBy(desc(withdrawals.requestedAt));

    return NextResponse.json(allWithdrawals);
}
