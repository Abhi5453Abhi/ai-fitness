import { NextResponse } from 'next/server';
import { db } from '@/db';
import { pushUpAttempts } from '@/db/schema';
import { auth } from '@/lib/firebase'; // Or your auth method

export async function POST(req: Request) {
    try {
        const { userId, videoUrl, repCount } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const isLiveSession = !videoUrl;
        const finalVideoUrl = videoUrl || "LIVE_AI_SESSION";
        const finalStatus = isLiveSession ? 'approved' : 'pending';
        const finalRepCount = repCount || 0;

        // Save to DB
        await db.insert(pushUpAttempts).values({
            userId,
            videoUrl: finalVideoUrl,
            status: finalStatus,
            repCount: finalRepCount
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving attempt:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
