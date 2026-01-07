import React, { createContext, useContext, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';

interface WorkoutAIContextType {
    detector: poseDetection.PoseDetector | null;
    isModelLoading: boolean;
    error: string | null;
}

const WorkoutAIContext = createContext<WorkoutAIContextType>({
    detector: null,
    isModelLoading: true,
    error: null,
});

export const useWorkoutAI = () => useContext(WorkoutAIContext);

export function WorkoutAIProvider({ children }: { children: React.ReactNode }) {
    const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                // Ensure backend is ready
                await tf.ready();
                await tf.setBackend('webgl');

                const model = poseDetection.SupportedModels.MoveNet;
                const detectorConfig = {
                    modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER
                };

                const detector = await poseDetection.createDetector(model, detectorConfig);
                setDetector(detector);
            } catch (err) {
                console.error("Failed to load MoveNet:", err);
                setError("Failed to load AI Model. Please check your connection.");
            } finally {
                setIsModelLoading(false);
            }
        };

        loadModel();
    }, []);

    return (
        <WorkoutAIContext.Provider value={{ detector, isModelLoading, error }}>
            {children}
        </WorkoutAIContext.Provider>
    );
}
