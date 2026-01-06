import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from "@/components/LanguageContext";

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AI Fitness Pal',
    description: 'Your AI-powered fitness companion',
}

import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
                <Analytics />
            </body>
        </html>
    );
}
