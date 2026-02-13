import { NextResponse } from 'next/server';
import { db } from '@/db';
import { withdrawals, pointsTransactions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { processCashfreePayout } from '@/lib/cashfree';
import { sendSMS, SMS_TEMPLATES } from '@/lib/sms';

export async function POST(req: Request) {
    const { withdrawalId } = await req.json();

    // Get withdrawal details
    const withdrawal = await db.query.withdrawals.findFirst({
        where: eq(withdrawals.id, withdrawalId)
    });

    if (!withdrawal) {
        return NextResponse.json({ error: "Withdrawal not found" }, { status: 404 });
    }

    if (withdrawal.status !== 'pending') {
        return NextResponse.json({ error: "Withdrawal already processed" }, { status: 400 });
    }

    // Update status to approved & processing
    await db.update(withdrawals)
        .set({ 
            status: 'processing',
            processedAt: new Date()
        })
        .where(eq(withdrawals.id, withdrawalId));

    // Trigger Cashfree payout (async)
    try {
        const result = await processCashfreePayout(withdrawal);
        
        if (result.success) {
            await db.update(withdrawals)
                .set({ 
                    status: 'completed',
                    completedAt: new Date(),
                    transactionId: result.transactionId
                })
                .where(eq(withdrawals.id, withdrawalId));

            // Deduct points by creating withdrawal transaction
            await db.insert(pointsTransactions).values({
                userId: withdrawal.userId,
                type: 'withdraw',
                points: withdrawal.points,
                source: 'withdrawal',
                referenceId: withdrawalId
            });

            // Send success SMS
            await sendSMS(withdrawal.userId, SMS_TEMPLATES.WITHDRAWAL_APPROVED(withdrawal.amount, withdrawal.upiId));
            
            return NextResponse.json({ success: true, message: "Payout successful" });
        } else {
            await db.update(withdrawals)
                .set({ 
                    status: 'failed',
                    failureReason: result.error
                })
                .where(eq(withdrawals.id, withdrawalId));

            // Send failure SMS
            await sendSMS(withdrawal.userId, SMS_TEMPLATES.WITHDRAWAL_FAILED(withdrawal.amount, result.error || 'Unknown error'));
            
            return NextResponse.json({ success: false, error: result.error });
        }
    } catch (error) {
        await db.update(withdrawals)
            .set({ 
                status: 'failed',
                failureReason: String(error)
            })
            .where(eq(withdrawals.id, withdrawalId));

        // Send failure SMS
        await sendSMS(withdrawal.userId, SMS_TEMPLATES.WITHDRAWAL_FAILED(withdrawal.amount, String(error)));

        return NextResponse.json({ error: "Payout failed" }, { status: 500 });
    }
}
