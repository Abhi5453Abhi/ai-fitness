import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { useWorkoutAI } from './WorkoutAIProvider';

interface PushUpCounterProps {
    onComplete: (count: number, mode: 'normal' | 'strict') => void;
    onClose: () => void;
}

export function PushUpCounter({ onComplete, onClose }: PushUpCounterProps) {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [count, setCount] = useState(0);
    const [feedback, setFeedback] = useState("Get Ready");
    const [mode, setMode] = useState<'normal' | 'strict'>('normal');

    const [phase, setPhase] = useState<'countdown' | 'workout' | 'finished'>('countdown');
    const [startCountdown, setStartCountdown] = useState(5);
    const [timeLeft, setTimeLeft] = useState(60);

    // Initial 5s Countdown
    useEffect(() => {
        if (phase === 'countdown') {
            if (startCountdown > 0) {
                const timer = setTimeout(() => setStartCountdown(prev => prev - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setPhase('workout');
            }
        }
    }, [phase, startCountdown]);

    // 60s Workout Timer
    useEffect(() => {
        if (phase === 'workout' && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (phase === 'workout' && timeLeft === 0) {
            handleComplete();
        }
    }, [phase, timeLeft]);

    const handleComplete = () => {
        setPhase('finished');
        onComplete(count, mode);
    };

    // State logic moved to refs for synchronous loop updates
    const isDownRef = useRef(false);

    // Use Global Context
    const { detector, isModelLoading, error } = useWorkoutAI();
    const requestRef = useRef<number>(0);

    useEffect(() => {
        // Only start detection if active phase
        if (detector && !isModelLoading && phase === 'workout') {
            detectPose();
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [detector, isModelLoading, mode, phase]); // Re-run if phase changes

    const detectPose = async () => {
        if (phase !== 'workout') return;

        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4 &&
            detector &&
            canvasRef.current
        ) {
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // Force video and canvas size match
            video.width = videoWidth;
            video.height = videoHeight;
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            try {
                const poses = await detector.estimatePoses(video);
                if (poses.length > 0) {
                    processPose(poses[0]);
                    drawCanvas(poses[0], videoWidth, videoHeight);
                }
            } catch (e) {
                console.error("Pose estimation error", e);
            }
        }

        requestRef.current = requestAnimationFrame(detectPose);
    };

    const processPose = (pose: poseDetection.Pose) => {
        const keypoints = pose.keypoints;

        // Keypoint Indices for MoveNet:
        // 5: left_shoulder, 6: right_shoulder
        // 7: left_elbow, 8: right_elbow
        // 9: left_wrist, 10: right_wrist
        // 11: left_hip, 12: right_hip
        // 13: left_knee, 14: right_knee

        // ARM POINTS
        const leftShoulder = keypoints.find(k => k.name === 'left_shoulder');
        const leftElbow = keypoints.find(k => k.name === 'left_elbow');
        const leftWrist = keypoints.find(k => k.name === 'left_wrist');

        const rightShoulder = keypoints.find(k => k.name === 'right_shoulder');
        const rightElbow = keypoints.find(k => k.name === 'right_elbow');
        const rightWrist = keypoints.find(k => k.name === 'right_wrist');

        // BODY POINTS (For Strict Mode)
        const leftHip = keypoints.find(k => k.name === 'left_hip');
        const leftKnee = keypoints.find(k => k.name === 'left_knee');
        const rightHip = keypoints.find(k => k.name === 'right_hip');
        const rightKnee = keypoints.find(k => k.name === 'right_knee');

        // Use the side with better visibility (higher confidence)
        let armAngle = 0;
        let bodyAngle = 0;
        let isRightSide = false;

        // Determine side based on ARM visibility first
        if (leftShoulder && leftElbow && leftWrist &&
            (leftShoulder.score || 0) > 0.3 && (leftElbow.score || 0) > 0.3 && (leftWrist.score || 0) > 0.3) {
            armAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);

            if (mode === 'strict' && leftHip && leftKnee && (leftHip.score || 0) > 0.3 && (leftKnee.score || 0) > 0.3) {
                bodyAngle = calculateAngle(leftShoulder, leftHip, leftKnee);
            }
        } else if (rightShoulder && rightElbow && rightWrist &&
            (rightShoulder.score || 0) > 0.3 && (rightElbow.score || 0) > 0.3 && (rightWrist.score || 0) > 0.3) {
            armAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
            isRightSide = true;

            if (mode === 'strict' && rightHip && rightKnee && (rightHip.score || 0) > 0.3 && (rightKnee.score || 0) > 0.3) {
                bodyAngle = calculateAngle(rightShoulder, rightHip, rightKnee);
            }
        } else {
            setFeedback("Body not fully visible");
            return;
        }

        // STRICT MODE CHECKS
        if (mode === 'strict') {
            // Check visibility
            const hip = isRightSide ? rightHip : leftHip;
            const knee = isRightSide ? rightKnee : leftKnee;

            if (!hip || !knee || (hip.score || 0) < 0.3 || (knee.score || 0) < 0.3) {
                setFeedback("Show Full Body (Hips & Knees)");
                return;
            }

            // Check alignment (Shoulder-Hip-Knee should be roughly 180, allow some slack e.g. > 150)
            if (bodyAngle < 150) {
                setFeedback("Straighten Your Back!");
                return;
            }
        }

        // Push-up Logic (Simple State Machine)
        if (armAngle > 160) {
            setFeedback("GO DOWN");
            if (isDownRef.current) {
                // Transition from Down to Up -> Count Rep
                setCount(prev => prev + 1);
                isDownRef.current = false;
            }
        } else if (armAngle < 90) {
            setFeedback("UP");
            isDownRef.current = true;
        }
    };

    const calculateAngle = (a: any, b: any, c: any) => {
        const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
        let angle = Math.abs(radians * 180.0 / Math.PI);
        if (angle > 180.0) angle = 360 - angle;
        return angle;
    };

    const drawCanvas = (pose: poseDetection.Pose, width: number, height: number) => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        // Draw Keypoints
        pose.keypoints.forEach((keypoint) => {
            if (keypoint.score && keypoint.score > 0.3) {
                ctx.beginPath();
                ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "aqua";
                ctx.fill();
                ctx.strokeStyle = "white";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });

        // Simple skeleton connections
        const adjacents = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.MoveNet);
        adjacents.forEach(([i, j]) => {
            const kp1 = pose.keypoints[i];
            const kp2 = pose.keypoints[j];
            if ((kp1.score || 0) > 0.3 && (kp2.score || 0) > 0.3) {
                ctx.beginPath();
                ctx.moveTo(kp1.x, kp1.y);
                ctx.lineTo(kp2.x, kp2.y);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "lime";
                ctx.stroke();
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
            {/* Header */}
            <div className="absolute top-0 w-full p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
                <div className="text-white">
                    <h2 className="text-xl font-bold">AI Push-Up Counter</h2>
                    <p className="text-sm opacity-80">{feedback}</p>
                </div>

                {/* Toggle Switch */}
                <div className="flex bg-white/10 rounded-full p-1 mx-4">
                    <button
                        onClick={() => setMode('normal')}
                        className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${mode === 'normal' ? 'bg-white text-black' : 'text-white'}`}
                    >
                        Normal
                    </button>
                    <button
                        onClick={() => setMode('strict')}
                        className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${mode === 'strict' ? 'bg-blue-500 text-white' : 'text-white'}`}
                    >
                        Strict
                    </button>
                </div>

                <div className={`text-xl font-black font-mono ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>
                    00:{timeLeft.toString().padStart(2, '0')}
                </div>

                <button onClick={onClose} className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 z-50 pointer-events-auto">
                    ✕
                </button>
            </div>

            <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
                {isModelLoading && (
                    <div className="absolute z-20 flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white font-bold">Initializing AI...</p>
                        <p className="text-xs text-gray-400">Please wait</p>
                    </div>
                )}

                {/* 5s Countdown Overlay */}
                {!isModelLoading && phase === 'countdown' && (
                    <div className="absolute inset-0 z-30 bg-black/80 flex flex-col items-center justify-center">
                        <h3 className="text-white text-2xl font-bold mb-4">Get in Position!</h3>
                        <div className="text-9xl font-black text-[#BBF246] animate-bounce">
                            {startCountdown}
                        </div>
                    </div>
                )}

                {error && (
                    <div className="absolute z-20 bg-red-500/10 p-4 rounded-xl text-red-500 border border-red-500/20">
                        <p className="font-bold">Error: {error}</p>
                        <button onClick={onClose} className="mt-2 text-sm underline">Close</button>
                    </div>
                )}

                <Webcam
                    ref={webcamRef}
                    className="absolute w-full h-full object-cover lg:object-contain"
                    mirrored={false}
                />
                <canvas
                    ref={canvasRef}
                    className="absolute w-full h-full object-cover lg:object-contain z-10"
                />

                {/* Count Overlay */}
                {!isModelLoading && !error && phase === 'workout' && (
                    <>
                        {mode === 'strict' && (
                            <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-blue-500/50 z-20 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Full Body Check Active</span>
                            </div>
                        )}
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/10 z-20 text-center">
                            <span className="text-xs text-gray-300 uppercase tracking-widest font-bold block mb-1">Reps</span>
                            <span className="text-6xl font-black text-white font-mono">{count}</span>
                        </div>

                        <button
                            onClick={handleComplete}
                            className="absolute bottom-6 left-6 right-6 bg-[#BBF246] text-[#192126] font-bold py-4 rounded-xl hover:bg-[#a5d83a] transition-colors z-50 shadow-lg shadow-[#BBF246]/20"
                        >
                            Finish & Save
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
