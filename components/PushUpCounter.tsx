import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { SwitchCamera, X } from 'lucide-react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { useWorkoutAI } from './WorkoutAIProvider';

interface PushUpCounterProps {
    onComplete: (count: number, mode: 'normal') => void;
    onClose: () => void;
}

export function PushUpCounter({ onComplete, onClose }: PushUpCounterProps) {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [count, setCount] = useState(0);
    const [feedback, setFeedback] = useState("Get Ready");
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

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
        onComplete(count, 'normal');
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
    }, [detector, isModelLoading, phase]); // Re-run if phase changes

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

        // ARM POINTS
        const leftShoulder = keypoints.find(k => k.name === 'left_shoulder');
        const leftElbow = keypoints.find(k => k.name === 'left_elbow');
        const leftWrist = keypoints.find(k => k.name === 'left_wrist');

        const rightShoulder = keypoints.find(k => k.name === 'right_shoulder');
        const rightElbow = keypoints.find(k => k.name === 'right_elbow');
        const rightWrist = keypoints.find(k => k.name === 'right_wrist');

        let armAngle = 0;

        // Determine side based on ARM visibility
        if (leftShoulder && leftElbow && leftWrist &&
            (leftShoulder.score || 0) > 0.3 && (leftElbow.score || 0) > 0.3 && (leftWrist.score || 0) > 0.3) {
            armAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
        } else if (rightShoulder && rightElbow && rightWrist &&
            (rightShoulder.score || 0) > 0.3 && (rightElbow.score || 0) > 0.3 && (rightWrist.score || 0) > 0.3) {
            armAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
        } else {
            setFeedback("Body not fully visible");
            return;
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
            {/* Header Controls */}
            <div className="absolute top-12 left-0 right-0 z-50 flex flex-col items-center gap-6 px-4">

                {/* Timer & Camera Control Group */}
                <div className="flex items-center gap-4">
                    {/* Camera Toggle */}
                    <button
                        onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')}
                        className="bg-[#BBF246] text-[#192126] w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-[#BBF246]/20 active:scale-95 transition-transform"
                    >
                        <SwitchCamera className="w-6 h-6" strokeWidth={2.5} />
                    </button>

                    {/* Timer */}
                    <div className={`bg-[#BBF246] text-[#192126] h-14 px-6 rounded-2xl flex items-center justify-center font-mono text-2xl font-black shadow-lg shadow-[#BBF246]/20 ${timeLeft < 10 ? 'animate-pulse text-red-600' : ''}`}>
                        00:{timeLeft.toString().padStart(2, '0')}
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="bg-white/10 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-white/20 backdrop-blur-md active:scale-95 transition-all"
                    >
                        <X className="w-6 h-6" strokeWidth={2.5} />
                    </button>
                </div>
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
                    mirrored={facingMode === 'user'}
                    videoConstraints={{ facingMode }}
                />
                <canvas
                    ref={canvasRef}
                    className="absolute w-full h-full object-cover lg:object-contain z-10"
                />

                {/* Count Overlay */}
                {!isModelLoading && !error && phase === 'workout' && (
                    <>
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
