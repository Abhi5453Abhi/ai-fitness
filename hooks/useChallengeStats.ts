import { useState, useEffect } from 'react';

export function useChallengeStats() {
    const [participantCount, setParticipantCount] = useState<number | null>(null);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/challenge/stats');
            const data = await res.json();
            setParticipantCount(data.participantCount);
        } catch (error) {
            console.error("Failed to fetch stats", error);
            setParticipantCount(0);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const joinChallenge = async () => {
        // In the new flow, "joining" is essentially recording an attempt.
        // We can just re-fetch stats or optimistically increment if appropriate.
        // For now, let's just re-fetch to be safe.
        // But since recording happens later, maybe just do nothing or trigger a refetch?
        // Let's optimistic increment for UX if valid
        setParticipantCount(prev => (prev || 0) + 1);
    };

    return { participantCount, joinChallenge };
}
