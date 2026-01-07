"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useUploadContext } from "./UploadContext";

export function UploadProgressToast() {
    const { isUploading, progress, status, resetUpload } = useUploadContext();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (status !== 'idle') {
            setIsVisible(true);
        }

        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (status === 'success') {
                    // Optional: reset after hiding
                    setTimeout(resetUpload, 500);
                }
            }, 5000); // Show success/error for 5s
            return () => clearTimeout(timer);
        }
    }, [status, resetUpload]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="fixed bottom-24 left-4 right-4 z-[100] md:left-auto md:right-8 md:w-96"
                >
                    <div className="bg-[#192126] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${status === 'uploading' ? 'bg-blue-500/20 text-blue-500' :
                                    status === 'success' ? 'bg-green-500/20 text-green-500' :
                                        'bg-red-500/20 text-red-500'
                                }`}>
                                {status === 'uploading' && <UploadCloud className="w-5 h-5 animate-bounce" />}
                                {status === 'success' && <CheckCircle className="w-5 h-5" />}
                                {status === 'error' && <XCircle className="w-5 h-5" />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white text-sm">
                                    {status === 'uploading' && "Uploading Video..."}
                                    {status === 'success' && "Upload Complete"}
                                    {status === 'error' && "Upload Failed"}
                                </h4>
                                <p className="text-xs text-gray-400 truncate">
                                    {status === 'uploading' && `${Math.round(progress)}% completed`}
                                    {status === 'success' && "Your video has been submitted."}
                                    {status === 'error' && "Please try again."}
                                </p>
                            </div>

                            {status === 'error' && (
                                <button onClick={resetUpload} className="p-2 hover:bg-white/5 rounded-full">
                                    <XCircle className="w-5 h-5 text-gray-400" />
                                </button>
                            )}
                        </div>

                        {status === 'uploading' && (
                            <>
                                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>

                                <div className="flex items-start gap-2 bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                                    <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-yellow-200 font-medium leading-tight">
                                        Do not close your browser until upload is complete.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
