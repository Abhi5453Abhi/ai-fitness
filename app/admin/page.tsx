'use client';

import { useState, useEffect } from 'react';
import { ReviewCard } from '@/components/admin/ReviewCard';
import { Loader2, Lock } from 'lucide-react';

interface Attempt {
    id: number;
    userId: string;
    videoUrl: string;
    status: 'pending' | 'approved' | 'rejected';
    repCount: number;
    createdAt: string; // serialized date
}

export default function AdminPage() {
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [activeTab, setActiveTab] = useState<'pending' | 'processed'>('pending');
    const [selectedAttemptId, setSelectedAttemptId] = useState<number | null>(null);

    const fetchAttempts = async () => {
        try {
            const res = await fetch('/api/admin/attempts');
            const data = await res.json();

            if (Array.isArray(data)) {
                setAttempts(data);
            } else {
                console.error("Fetched data is not an array:", data);
                setAttempts([]);
            }
        } catch (error) {
            console.error(error);
            setAttempts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchAttempts();
        }
    }, [isAuthenticated]);

    const handleReview = async (id: number, status: 'approved' | 'rejected', reps: number) => {
        // Optimistic update
        setAttempts(prev => prev.filter(a => a.id !== id));

        try {
            await fetch('/api/admin/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status, repCount: reps })
            });
        } catch (error) {
            console.error("Failed to submit review", error);
            fetchAttempts(); // Revert on error
        }
    };

    // Basic PIN Auth for MVP
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === '1234') { // Hardcoded for Demo
            setIsAuthenticated(true);
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



    const filteredAttempts = attempts.filter(a =>
        activeTab === 'pending' ? a.status === 'pending' : a.status !== 'pending'
    );

    const selectedAttempt = attempts.find(a => a.id === selectedAttemptId);

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black mb-1">Moderation Queue</h1>
                        <p className="text-gray-400 text-sm">Review user push-up attempts</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setActiveTab('pending'); setSelectedAttemptId(null); }}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'pending' ? 'bg-[#BBF246] text-[#192126]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => { setActiveTab('processed'); setSelectedAttemptId(null); }}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'processed' ? 'bg-[#BBF246] text-[#192126]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            Processed
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-[#BBF246] animate-spin" />
                    </div>
                ) : filteredAttempts.length === 0 ? (
                    <div className="text-center py-20 bg-[#192126] rounded-3xl border border-white/5 border-dashed">
                        <p className="text-gray-400">No {activeTab} attempts found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* List View */}
                        <div className="bg-[#192126] rounded-2xl overflow-hidden border border-white/10">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold sticky top-0">
                                    <tr>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Reps</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredAttempts.map(attempt => (
                                        <tr
                                            key={attempt.id}
                                            onClick={() => setSelectedAttemptId(attempt.id)}
                                            className={`cursor-pointer transition-colors ${selectedAttemptId === attempt.id ? 'bg-[#BBF246]/10' : 'hover:bg-white/5'}`}
                                        >
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${attempt.status === 'approved' ? 'bg-[#BBF246]/20 text-[#BBF246]' :
                                                    attempt.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                                                        'bg-yellow-500/20 text-yellow-500'
                                                    }`}>
                                                    {attempt.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold">{attempt.userId}</td>
                                            {/* @ts-ignore */}
                                            <td className="px-6 py-4 text-xs text-gray-400 font-mono">{new Date(attempt.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 font-mono font-bold text-[#BBF246]">
                                                {attempt.status === 'approved' ? attempt.repCount : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-xs font-bold text-[#BBF246] hover:underline">
                                                    {attempt.status === 'pending' ? 'Review' : 'Edit'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Overlay/Modal */}
            {selectedAttempt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedAttemptId(null)}>
                    <div className="w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                        <ReviewCard
                            key={selectedAttempt.id} // Key ensures state reset
                            attempt={selectedAttempt}
                            onReview={(id, status, reps) => {
                                handleReview(id, status, reps);
                                setSelectedAttemptId(null); // Close after action if desired, or keep open
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
