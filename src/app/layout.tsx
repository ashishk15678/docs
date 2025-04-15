import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <ClerkProvider>
                <body>{children}</body>
                <Analytics />
                <Toaster />
            </ClerkProvider>
        </html>
    );
}