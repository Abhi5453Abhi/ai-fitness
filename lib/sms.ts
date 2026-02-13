export async function sendSMS(mobile: string, message: string) {
    const apiKey = process.env.FAST2SMS_API_KEY;
    
    if (!apiKey) {
        console.warn('SMS API key not configured');
        return;
    }

    try {
        await fetch('https://www.fast2sms.com/dev/bulkV2', {
            method: 'POST',
            headers: {
                'authorization': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                route: 'v3',
                sender_id: 'FITPAL', // Your sender ID
                message: message,
                language: 'english',
                numbers: mobile.replace('+91', '') // Remove country code if present
            })
        });
    } catch (error) {
        console.error('SMS sending failed:', error);
    }
}

// Message templates
export const SMS_TEMPLATES = {
    WITHDRAWAL_REQUESTED: (amount: number) => 
        `Your withdrawal request of Rs.${amount} is pending approval. You'll be notified soon. - FitnessPal`,
    
    WITHDRAWAL_APPROVED: (amount: number, upi: string) => 
        `Great news! Rs.${amount} has been sent to ${upi}. Check your account! - FitnessPal`,
    
    WITHDRAWAL_FAILED: (amount: number, reason: string) => 
        `Withdrawal of Rs.${amount} failed: ${reason}. Please try again. - FitnessPal`,
    
    WITHDRAWAL_REJECTED: (amount: number, reason: string) => 
        `Your withdrawal request of Rs.${amount} was rejected: ${reason}. - FitnessPal`
};
