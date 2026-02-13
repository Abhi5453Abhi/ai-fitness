import { NextResponse } from 'next/server';
import { db } from '@/db';
import { withdrawals } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sendSMS, SMS_TEMPLATES } from '@/lib/sms';

export async function POST(req: Request) {
    const { withdrawalId, reason } = await req.json();

    // Get withdrawal details for SMS
    const withdrawal = await db.query.withdrawals.findFirst({
        where: eq(withdrawals.id, withdrawalId)
    });

    await db.update(withdrawals)
        .set({ 
            status: 'rejected',
            processedAt: new Date(),
            rejectionReason: reason || 'No reason provided'
        })
        .where(eq(withdrawals.id, withdrawalId));

    // Send rejection SMS
    if (withdrawal) {
        await sendSMS(withdrawal.userId, SMS_TEMPLATES.WITHDRAWAL_REJECTED(withdrawal.amount, reason || 'No reason provided'));
    }

    return NextResponse.json({ success: true });
}
