import { NextResponse } from 'next/server';
import { db } from '@/db';
import { withdrawals } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = db.select().from(withdrawals);
    
    if (status) {
        query = query.where(eq(withdrawals.status, status as any));
    }

    const allWithdrawals = await query.orderBy(desc(withdrawals.requestedAt));

    return NextResponse.json(allWithdrawals);
}
