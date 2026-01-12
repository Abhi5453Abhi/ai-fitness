import { NextResponse } from 'next/server';
import { db } from '@/db';
import { pushUpAttempts, users } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function POST(req: Request) {
    try {
        const { id, status, repCount } = await req.json();

        // 1. Get the attempt to find the userId
        const attempt = await db.query.pushUpAttempts.findFirst({
            where: eq(pushUpAttempts.id, id)
        });

        if (!attempt) {
            return NextResponse.json({ error: "Attempt not found" }, { status: 404 });
        }

        // 2. Update Attempt Status
        await db.update(pushUpAttempts)
            .set({
                status,
                repCount: status === 'approved' ? repCount : 0
            })
            .where(eq(pushUpAttempts.id, id));



        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Review Error:", error);
        return NextResponse.json({ error: "Failed to update attempt" }, { status: 500 });
    }
}
