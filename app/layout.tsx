import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import Script from 'next/script'
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
            <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
                {/* ADS DISABLED - Too intrusive for users */}
                {/* Propeller Ads Multitag 
                <Script
                    src="https://quge5.com/88/tag.min.js"
                    data-zone="212033"
                    strategy="afterInteractive"
                    data-cfasync="false"
                />
                */}
                
                {/* Google AdSense 
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6891301397326863"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                */}
                
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

