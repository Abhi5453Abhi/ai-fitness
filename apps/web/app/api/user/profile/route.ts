import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();

        if (!req.userId) {
            return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
        }

        // Upsert User
        await db.insert(users).values({
            mobile: req.userId,
            name: req.name,
            onboardingData: req // Save full profile data as JSON
        }).onConflictDoUpdate({
            target: users.mobile,
            set: {
                name: req.name,
                onboardingData: req // Update profile on re-save
            }
        });

        // Get the internal integer ID if needed, but for now just returning success
        // We might want to return the internal ID if other APIs need it, 
        // but currently they seem to rely on the mobile/userId string or doing their own lookup.

        return NextResponse.json({ success: true, userId: req.userId });

    } catch (error) {
        console.error('Error saving user profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
