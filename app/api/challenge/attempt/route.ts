import { NextResponse } from 'next/server';
import { db } from '@/db';
import { pushUpAttempts } from '@/db/schema';
import { auth } from '@/lib/firebase'; // Or your auth method

export async function POST(req: Request) {
    try {
        const { userId, videoUrl } = await req.json();

        if (!userId || !videoUrl) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Save to DB
        await db.insert(pushUpAttempts).values({
            userId,
            videoUrl,
            status: 'pending',
            repCount: 0
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving attempt:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
