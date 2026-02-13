'use client';

import { useState, useEffect } from 'react';
import { WithdrawalAdminPanel } from '@/components/admin/WithdrawalAdminPanel';
import { Loader2, Lock } from 'lucide-react';

export default function AdminPage() {
    const [withdrawals, setWithdrawals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');

    const fetchWithdrawals = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/withdraw/all');
            const data = await res.json();
            setWithdrawals(data);
        } catch (error) {
            console.error(error);
            setWithdrawals([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedAuth = localStorage.getItem('admin_authenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchWithdrawals();
        }
    }, [isAuthenticated]);

    // Basic PIN Auth for MVP
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === '1234') { // Hardcoded for Demo
            setIsAuthenticated(true);
            localStorage.setItem('admin_authenticated', 'true');
        } else {
            alert('Incorrect PIN');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="w-full max-w-sm bg-[#192126] p-8 rounded-2xl border border-white/10">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#BBF246]">
                            <Lock className="w-6 h-6" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-black text-center mb-6">Admin Access</h1>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter PIN"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest mb-4 focus:border-[#BBF246] focus:outline-none"
                    />
                    <button type="submit" className="w-full bg-[#BBF246] text-[#192126] font-bold py-3 rounded-xl hover:bg-[#a6d93b] transition-colors">
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-2 md:p-10">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6 md:mb-10">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black mb-1">Withdrawal Management</h1>
                        <p className="text-gray-400 text-xs md:text-sm">Review and approve withdrawal requests</p>
                    </div>
                </div>

                {/* Withdrawals Content */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-[#BBF246] animate-spin" />
                    </div>
                ) : withdrawals.length === 0 ? (
                    <div className="text-center py-20 bg-[#192126] rounded-3xl border border-white/5 border-dashed">
                        <p className="text-gray-400">No withdrawals found.</p>
                    </div>
                ) : (
                    <WithdrawalAdminPanel withdrawals={withdrawals} onRefresh={fetchWithdrawals} />
                )}
            </div>
        </div>
    );
}
