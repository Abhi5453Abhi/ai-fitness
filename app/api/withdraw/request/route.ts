import { NextResponse } from 'next/server';
import { db } from '@/db';
import { withdrawals } from '@/db/schema';
import { sendSMS, SMS_TEMPLATES } from '@/lib/sms';

export async function POST(req: Request) {
    const { userId, points, upiId } = await req.json();

    // Validate UPI ID format (basic regex)
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upiId)) {
        return NextResponse.json({ error: "Invalid UPI ID format" }, { status: 400 });
    }

    if (points < 1000 || points % 1000 !== 0) {
        return NextResponse.json({ error: "Points must be minimum 1000 and in multiples of 1000" }, { status: 400 });
    }

    const amount = points / 100; // 1 point = ₹0.01, 100 points = ₹1

    const withdrawal = await db.insert(withdrawals).values({
        userId,
        points,
        amount,
        upiId,
        status: 'pending'
    }).returning();

    // Send SMS notification
    await sendSMS(userId, SMS_TEMPLATES.WITHDRAWAL_REQUESTED(amount));

    return NextResponse.json({ 
        success: true, 
        withdrawalId: withdrawal[0].id,
        message: "Withdrawal request submitted. Awaiting admin approval."
    });
}
