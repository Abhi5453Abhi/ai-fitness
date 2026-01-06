import { NextResponse } from 'next/server';
import { db } from '@/db';
import { pushUpAttempts } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
    try {
        console.log("Fetching pending attempts...");
        const attempts = await db.select()
            .from(pushUpAttempts)
            .orderBy(desc(pushUpAttempts.createdAt));

        console.log("Attempts fetched:", attempts);

        return NextResponse.json(attempts);
    } catch (error) {
        console.error("Error fetching attempts:", error);
        return NextResponse.json({ error: "Failed to fetch attempts", details: String(error) }, { status: 500 });
    }
}
