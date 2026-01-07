import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { UploadProvider } from "@/components/UploadContext";
import { UploadProgressToast } from "@/components/UploadProgressToast";

// ... existing code ...

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
                <LanguageProvider>
                    <UploadProvider>
                        {children}
                        <UploadProgressToast />
                    </UploadProvider>
                </LanguageProvider>
                <Analytics />
            </body>
        </html>
    );
}
