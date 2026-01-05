import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'AI Fitness Pal',
    description: 'Your AI-powered fitness companion',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning>{children}</body>
        </html>
    )
}
