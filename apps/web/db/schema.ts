import { pgTable, serial, text, jsonb, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    mobile: text('mobile').unique().notNull(),
    name: text('name'),
    onboardingData: jsonb('onboarding_data'),

    createdAt: timestamp('created_at').defaultNow(),
});

export const plans = pgTable('plans', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    planData: jsonb('plan_data').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const pushUpAttempts = pgTable('push_up_attempts', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), // Using text to match auth uid or mobile if strictly linked
    videoUrl: text('video_url').notNull(),
    status: text('status', { enum: ['pending', 'approved', 'rejected'] }).default('pending').notNull(),
    repCount: integer('rep_count').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});
