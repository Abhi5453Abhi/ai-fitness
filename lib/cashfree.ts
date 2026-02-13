interface PayoutResult {
    success: boolean;
    transactionId?: string;
    error?: string;
}

export async function processCashfreePayout(withdrawal: {
    id: number;
    userId: string;
    amount: number;
    upiId: string;
}): Promise<PayoutResult> {
    const clientId = process.env.CASHFREE_CLIENT_ID;
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
    const env = process.env.CASHFREE_ENV || 'TEST'; // TEST or PROD
    const testMode = process.env.CASHFREE_TEST_MODE === 'true'; // Bypass Cashfree for testing
    
    console.log('Cashfree Config:', {
        clientId: clientId ? `${clientId.substring(0, 10)}...` : 'NOT SET',
        hasSecret: !!clientSecret,
        env,
        testMode,
        withdrawalId: withdrawal.id
    });

    // TEST MODE: Bypass Cashfree API and simulate success
    if (testMode) {
        console.log('⚠️ TEST MODE: Bypassing Cashfree API, simulating successful payout');
        return {
            success: true,
            transactionId: `TEST_${withdrawal.id}_${Date.now()}`
        };
    }

    if (!clientId || !clientSecret) {
        return { 
            success: false, 
            error: 'Cashfree credentials not configured. Please set CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET in .env.local or enable CASHFREE_TEST_MODE=true' 
        };
    }
    
    const baseUrl = env === 'TEST' 
        ? 'https://payout-gamma.cashfree.com'
        : 'https://payout-api.cashfree.com';

    try {
        // Step 1: Get auth token
        console.log('Calling Cashfree auth:', `${baseUrl}/payout/v1/authorize`);
        
        const authResponse = await fetch(`${baseUrl}/payout/v1/authorize`, {
            method: 'POST',
            headers: {
                'X-Client-Id': clientId,
                'X-Client-Secret': clientSecret,
                'Content-Type': 'application/json'
            }
        });

        const authData = await authResponse.json();
        console.log('Cashfree auth response:', {
            status: authResponse.status,
            statusText: authResponse.statusText,
            hasToken: !!authData.data?.token,
            response: authData
        });

        const token = authData.data?.token;

        if (!token) {
            return { 
                success: false, 
                error: `Cashfree auth failed: ${authData.message || authData.subCode || 'No token received'}` 
            };
        }

        // Step 2: Create transfer
        const transferId = `WD_${withdrawal.id}_${Date.now()}`;
        const transferResponse = await fetch(`${baseUrl}/payout/v1/directTransfer`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                transferId: transferId,
                transferMode: 'upi',
                amount: withdrawal.amount.toString(),
                beneDetails: {
                    vpa: withdrawal.upiId,
                    name: 'Fitness User' // You can fetch actual name from users table
                },
                remarks: 'Fitness Points Withdrawal'
            })
        });

        const transferData = await transferResponse.json();

        if (transferData.status === 'SUCCESS' || transferData.subCode === '200') {
            return { 
                success: true, 
                transactionId: transferData.data?.referenceId || transferId 
            };
        } else {
            return { 
                success: false, 
                error: transferData.message || 'Transfer failed' 
            };
        }
    } catch (error) {
        console.error('Cashfree payout error:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        };
    }
}
