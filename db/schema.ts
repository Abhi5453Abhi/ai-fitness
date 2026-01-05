import { pgTable, serial, text, jsonb, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    mobile: text('mobile').unique().notNull(),
    name: text('name'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const plans = pgTable('plans', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    planData: jsonb('plan_data').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});
