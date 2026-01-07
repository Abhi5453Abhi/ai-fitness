"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { useUploadThing } from "@/utils/uploadthing";

interface UploadContextType {
    isUploading: boolean;
    progress: number;
    status: 'idle' | 'uploading' | 'success' | 'error';
    startBackgroundUpload: (file: File, onComplete?: (url: string) => void) => Promise<void>;
    resetUpload: () => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const completionCallbackRef = useRef<((url: string) => void) | null>(null);

    const { startUpload } = useUploadThing("videoUploader", {
        onClientUploadComplete: (res) => {
            console.log("Background Upload Completed:", res);
            setIsUploading(false);
            setStatus('success');
            setProgress(100);
            if (res && res[0] && completionCallbackRef.current) {
                completionCallbackRef.current(res[0].url);
            }
        },
        onUploadError: (error: Error) => {
            console.error("Background Upload Error:", error);
            setIsUploading(false);
            setStatus('error');
            alert(`Upload Failed: ${error.message}`);
        },
        onUploadProgress: (p: number) => {
            console.log(`Background Upload Progress: ${p}%`);
            setProgress(p);
        }
    });

    const startBackgroundUpload = async (file: File, onComplete?: (url: string) => void) => {
        try {
            if (onComplete) {
                completionCallbackRef.current = onComplete;
            }
            setIsUploading(true);
            setStatus('uploading');
            setProgress(0);

            await startUpload([file]);
        } catch (e) {
            console.error("Start upload failed", e);
            setIsUploading(false);
            setStatus('error');
        }
    };

    const resetUpload = () => {
        setIsUploading(false);
        setProgress(0);
        setStatus('idle');
        completionCallbackRef.current = null;
    };

    // Protect against tab closure
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isUploading) {
                e.preventDefault();
                e.returnValue = ''; // Chrome requires returnValue to be set
            }
        };

        if (isUploading) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isUploading]);

    return (
        <UploadContext.Provider value={{ isUploading, progress, status, startBackgroundUpload, resetUpload }}>
            {children}
        </UploadContext.Provider>
    );
}

export function useUploadContext() {
    const context = useContext(UploadContext);
    if (context === undefined) {
        throw new Error("useUploadContext must be used within an UploadProvider");
    }
    return context;
}
