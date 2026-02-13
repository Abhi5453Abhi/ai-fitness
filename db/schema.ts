import { pgTable, serial, text, jsonb, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    mobile: text('mobile').unique().notNull(),
    name: text('name'),
    onboardingData: jsonb('onboarding_data'),
    lastWithdrawalAt: timestamp('last_withdrawal_at'),
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

export const withdrawals = pgTable('withdrawals', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), // Phone number (matches userId in pushUpAttempts)
    points: integer('points').notNull(), // Points being withdrawn
    amount: integer('amount').notNull(), // Amount in rupees (points / 10)
    upiId: text('upi_id').notNull(), // User's UPI ID (e.g., user@paytm)
    status: text('status', { 
        enum: ['pending', 'approved', 'processing', 'completed', 'failed', 'rejected'] 
    }).default('pending').notNull(),
    requestedAt: timestamp('requested_at').defaultNow().notNull(),
    processedAt: timestamp('processed_at'), // When admin approved/rejected
    completedAt: timestamp('completed_at'), // When payout completed
    approvedBy: text('approved_by'), // Admin identifier (optional for now)
    transactionId: text('transaction_id'), // Cashfree transfer ID
    failureReason: text('failure_reason'), // If failed, reason from Cashfree
    rejectionReason: text('rejection_reason'), // If rejected by admin, reason
});

export const pointsTransactions = pgTable('points_transactions', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    type: text('type', { enum: ['earn', 'withdraw'] }).notNull(),
    points: integer('points').notNull(),
    source: text('source'), // 'pushup', 'withdrawal', etc.
    referenceId: integer('reference_id'), // withdrawal ID or attempt ID
    createdAt: timestamp('created_at').defaultNow()
});
