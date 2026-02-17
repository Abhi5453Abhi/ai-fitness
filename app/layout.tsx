import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from "@/components/LanguageContext";
import { Analytics } from "@vercel/analytics/react"
import { PostHogProvider } from './providers/PostHogProvider'
import PostHogPageView from './providers/PostHogPageView'
import { WorkoutAIProvider } from '@/components/WorkoutAIProvider'

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
            <head>
                {/* Propeller Ads Multitag */}
                <script 
                    src="https://quge5.com/88/tag.min.js" 
                    data-zone="212033" 
                    async 
                    data-cfasync="false"
                />
            </head>
            <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
                <PostHogProvider>
                    <WorkoutAIProvider>
                        <LanguageProvider>
                            <PostHogPageView />
                            {children}
                        </LanguageProvider>
                    </WorkoutAIProvider>
                </PostHogProvider>
                <Analytics />
            </body>
        </html>
    );
}

