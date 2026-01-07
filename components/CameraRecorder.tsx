import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, StopCircle, X, CheckCircle, Video, User, UploadCloud, SwitchCamera } from 'lucide-react';
import { useUploadThing } from '@/utils/uploadthing';

interface CameraRecorderProps {
    onClose: () => void;
    onComplete: (videoUrl: string | null) => void;
}

type Mode = 'preview' | 'countdown' | 'recording' | 'review' | 'uploading' | 'success';

export function CameraRecorder({ onClose, onComplete }: CameraRecorderProps) {
    const [mode, setMode] = useState<Mode>('preview');
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

    const { startUpload, isUploading } = useUploadThing("videoUploader", {
        onClientUploadComplete: (res) => {
            console.log("Upload Completed:", res);
            setMode('success');
            if (res && res[0]) {
                onComplete(res[0].url); // Pass back the URL
            }
        },
        onUploadError: (error: Error) => {
            console.error("Upload Error:", error);
            alert(`Upload Failed: ${error.message}`);
            setMode('review'); // Go back to review on error
        },
        onUploadProgress: (p: number) => {
            console.log(`Upload Progress: ${p}%`);
        }
    });

    const [count, setCount] = useState(5); // 5s countdown
    const [timeLeft, setTimeLeft] = useState(60); // 1m recording

    // Initialize Camera
    useEffect(() => {
        let currentStream: MediaStream | null = null;

        const startCamera = async () => {
            try {
                const s = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: facingMode,
                        // Remove strict aspect ratio to prevent excessive cropping/zooming on mobile
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    },
                    audio: false // No audio needed for pushups usually
                });
                setStream(s);
                currentStream = s;
                if (videoRef.current) {
                    videoRef.current.srcObject = s;
                }

                // Initialize MediaRecorder
                const options = {
                    mimeType: 'video/webm;codecs=vp8,opus',
                    videoBitsPerSecond: 2500000 // 2.5 Mbps ~ 18.75 MB / min
                };

                // Fallback if specific mimeType isn't supported
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    delete (options as any).mimeType;
                }

                const mediaRecorder = new MediaRecorder(s, options);
                mediaRecorderRef.current = mediaRecorder;
                chunksRef.current = [];

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunksRef.current.push(e.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                    setRecordedBlob(blob);
                };

            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("Could not access camera. Please check permissions.");
                onClose();
            }
        };

        startCamera();

        return () => {
            // Cleanup
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [onClose, facingMode]);

    // Handle Countdown
    useEffect(() => {
        if (mode === 'countdown') {
            if (count > 0) {
                const timer = setTimeout(() => setCount(c => c - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                // Countdown finished, start recording
                setMode('recording');
                setTimeLeft(60);
                chunksRef.current = [];
                mediaRecorderRef.current?.start();
            }
        }
    }, [mode, count]);

    // Handle Recording Timer
    useEffect(() => {
        if (mode === 'recording') {
            if (timeLeft > 0) {
                const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                // Time's up
                handleStop();
            }
        }
    }, [mode, timeLeft]);


    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setCount(5);
        setMode('countdown');
    };

    const handleStop = () => {
        mediaRecorderRef.current?.stop();
        setMode('review');
    };

    const handleUpload = async () => {
        if (!recordedBlob) return;
        setMode('uploading');

        // Convert Blob to File
        const file = new File([recordedBlob], "pushup-attempt.webm", { type: "video/webm" });

        await startUpload([file]);
    };

    const toggleCamera = () => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    };

    return (
        <div className="fixed inset-0 bg-black z-[70] flex flex-col">
            {/* Video Feed */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${facingMode === 'user' ? 'transform scale-x-[-1]' : ''}`} // Mirror effect only for front camera
                />
            </div>

            {/* Overlays */}
            <div className="relative z-10 flex-1 flex flex-col p-6">

                {/* Header (Hidden during recording for cleaner look?) */}
                {mode !== 'recording' && (
                    <div className="flex justify-between items-center">
                        <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            LIVE
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                )}

                {mode === 'preview' && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
                        <button
                            onClick={toggleCamera}
                            className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full text-white flex items-center gap-2 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <SwitchCamera className="w-4 h-4" />
                            <span className="text-xs font-bold">{facingMode === 'user' ? 'Front' : 'Back'}</span>
                        </button>
                    </div>
                )}

                {/* Countdown Overlay */}
                <AnimatePresence>
                    {mode === 'countdown' && count > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                            <motion.div
                                key={count}
                                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 1, scale: 1.5, rotate: 0 }}
                                exit={{ opacity: 0, scale: 2 }}
                                transition={{ duration: 0.5, type: 'spring' }}
                                className="text-9xl font-black text-[#BBF246] drop-shadow-[0_0_30px_rgba(187,242,70,0.5)]"
                            >
                                {count}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Recording UI */}
                {mode === 'recording' && (
                    <div className="flex-1 flex flex-col">
                        {/* Timer Top Center */}
                        <div className="mx-auto mt-10">
                            <div className="bg-red-600/90 backdrop-blur text-white px-6 py-2 rounded-full font-mono text-2xl font-bold tracking-widest border-2 border-red-500/50 shadow-lg animate-pulse">
                                {formatTime(timeLeft)}
                            </div>
                        </div>

                        {/* Stop Button Bottom */}
                        <div className="mt-auto flex justify-center mb-10">
                            <button
                                onClick={handleStop}
                                className="w-20 h-20 rounded-full bg-white flex items-center justify-center relative hover:scale-105 transition-transform"
                            >
                                <div className="absolute inset-0 rounded-full border-4 border-white opacity-30 animate-ping"></div>
                                <div className="w-8 h-8 bg-red-600 rounded-md"></div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Preview UI */}
                {mode === 'preview' && (
                    <div className="flex-1 flex flex-col justify-end pb-10 items-center">
                        <div className="mb-8 text-center bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                            <h3 className="text-white font-bold text-lg">Position Yourself</h3>
                            <p className="text-gray-300 text-sm">Make sure your full body is visible.</p>
                        </div>

                        <button
                            onClick={handleStart}
                            className="w-20 h-20 rounded-full border-[6px] border-white flex items-center justify-center group relative"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#BBF246] group-hover:scale-90 transition-transform"></div>
                        </button>
                    </div>
                )}

                {/* Review UI */}
                {mode === 'review' && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center text-white">
                        <CheckCircle className="w-20 h-20 text-[#BBF246] mb-6" />
                        <h2 className="text-3xl font-black mb-2">Challenge Complete!</h2>
                        <p className="text-gray-400 mb-10">Great job capturing your attempt.</p>

                        <div className="w-full space-y-3">
                            <button
                                onClick={handleUpload}
                                className="w-full py-4 bg-[#BBF246] text-[#192126] rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                            >
                                <UploadCloud className="w-5 h-5" />
                                Submit & Upload
                            </button>
                            <button
                                onClick={() => {
                                    setMode('preview');
                                    setCount(5);
                                    setTimeLeft(60);
                                    setRecordedBlob(null);
                                }}
                                className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold"
                            >
                                Retake
                            </button>
                        </div>
                    </div>
                )}

                {/* Uploading UI */}
                {mode === 'uploading' && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center text-white">
                        <div className="w-16 h-16 border-4 border-[#BBF246] border-t-transparent rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold mb-2">Uploading Video...</h2>
                        <p className="text-gray-400">Please wait while we secure your attempt.</p>
                    </div>
                )}

                {/* Success UI */}
                {mode === 'success' && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center text-white">
                        <CheckCircle className="w-20 h-20 text-[#BBF246] mb-6" />
                        <h2 className="text-3xl font-black mb-2">Upload Complete!</h2>
                        <p className="text-gray-400 mb-8">Your attempt has been submitted for review.</p>
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-white/10 rounded-full font-bold hover:bg-white/20 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

