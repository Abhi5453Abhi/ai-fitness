import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from "@/components/LanguageContext";
import { UploadProvider } from "@/components/UploadContext";
import { UploadProgressToast } from "@/components/UploadProgressToast";
import { Analytics } from "@vercel/analytics/react"
import { PostHogProvider } from './providers/PostHogProvider'
import PostHogPageView from './providers/PostHogPageView'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AI Fitness Pal',
    description: 'Your AI-powered fitness companion',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
                <PostHogProvider>
                    <LanguageProvider>
                        <UploadProvider>
                            <PostHogPageView />
                            {children}
                        </UploadProvider>
                    </LanguageProvider>
                </PostHogProvider>
                <Analytics />
            </body>
        </html>
    );
}
