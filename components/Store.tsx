import React, { useState, useEffect, useCallback } from 'react';
import { Wallet, History, AlertCircle } from 'lucide-react';
import { WithdrawModal } from './WithdrawModal';
import { WithdrawHistory } from './WithdrawHistory';
import { PropellerBanner } from './ads/PropellerBanner';

interface StoreProps {
    userId: string;
    currentPoints: number;
}

export const Store = ({ userId, currentPoints }: StoreProps) => {
    const [eligibility, setEligibility] = useState<any>(null);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchEligibility = useCallback(async () => {
        if (!userId) return;
        const res = await fetch(`/api/withdraw/eligibility?userId=${userId}`);
        const data = await res.json();
        setEligibility(data);
    }, [userId]);

    useEffect(() => {
        fetchEligibility();
    }, [fetchEligibility]);

    return (
        <div className="h-full overflow-y-auto pb-24 p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-black mb-2 text-[#192126]">Withdraw</h1>
                <p className="text-gray-500 font-medium">Convert your points to real money</p>
            </div>

            {/* Current Balance Card */}
            <div className="bg-gradient-to-br from-[#BBF246] to-[#a6d93b] rounded-3xl p-6 mb-6 text-[#192126]">
                <p className="text-sm font-bold opacity-80 mb-1">Available Balance</p>
                <div className="flex items-baseline gap-2 mb-4">
                    <h2 className="text-5xl font-black">{currentPoints}</h2>
                    <span className="text-xl font-bold opacity-80">points</span>
                </div>
                <div className="flex items-center gap-2 bg-black/10 rounded-full px-3 py-1.5 w-fit">
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-bold">= ₹{(currentPoints / 100).toFixed(2)}</span>
                </div>
            </div>

            {/* 🎯 Propeller Banner Ad */}
            <div className="mb-6">
                <PropellerBanner className="rounded-2xl overflow-hidden" />
            </div>

            {/* Eligibility Status */}
            {eligibility && (
                <>
                    {eligibility.eligible ? (
                        <button
                            onClick={() => setShowWithdrawModal(true)}
                            className="w-full bg-[#192126] text-white py-4 rounded-2xl font-bold text-lg mb-4 hover:bg-[#2a3740] transition-colors"
                        >
                            Withdraw Money
                        </button>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-yellow-900 text-sm mb-1">Cannot Withdraw</p>
                                    {eligibility.currentPoints < 1000 && (
                                        <p className="text-yellow-700 text-xs">
                                            Minimum 1000 points required. You need {1000 - eligibility.currentPoints} more points.
                                        </p>
                                    )}
                                    {eligibility.hasPendingWithdrawal && (
                                        <p className="text-yellow-700 text-xs">You have a pending withdrawal request.</p>
                                    )}
                                    {eligibility.weeklyLimitHit && (
                                        <p className="text-yellow-700 text-xs">
                                            Next withdrawal available on {new Date(eligibility.nextEligibleDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Info Card */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <h3 className="font-bold text-sm mb-3 text-[#192126]">How it works</h3>
                <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex gap-2">
                        <span>•</span>
                        <span>100 points = ₹1 (1 point = ₹0.01)</span>
                    </li>
                    <li className="flex gap-2">
                        <span>•</span>
                        <span>Minimum withdrawal: 1000 points</span>
                    </li>
                    <li className="flex gap-2">
                        <span>•</span>
                        <span>One withdrawal per week</span>
                    </li>
                    <li className="flex gap-2">
                        <span>•</span>
                        <span>Instant UPI transfer after approval</span>
                    </li>
                </ul>
            </div>

            {/* History Button */}
            <button
                onClick={() => setShowHistory(true)}
                className="w-full border-2 border-gray-200 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
                <History className="w-4 h-4" />
                Withdrawal History
            </button>

            {/* Modals */}
            {showWithdrawModal && (
                <WithdrawModal
                    userId={userId}
                    maxPoints={eligibility?.maxWithdrawable || 0}
                    onClose={() => setShowWithdrawModal(false)}
                    onSuccess={() => {
                        setShowWithdrawModal(false);
                        fetchEligibility();
                    }}
                />
            )}

            {showHistory && (
                <WithdrawHistory
                    userId={userId}
                    onClose={() => setShowHistory(false)}
                />
            )}
        </div>
    );
};
