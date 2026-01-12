'use client';

import { WorkoutAIProvider } from '@/components/WorkoutAIProvider';

export function WorkoutAIWrapper({ children }: { children: React.ReactNode }) {
    return <WorkoutAIProvider>{children}</WorkoutAIProvider>;
}
