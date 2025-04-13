import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = auth()

    // For development/testing, allow access without authentication
    if (!userId && process.env.NODE_ENV === "production") {
        redirect("/")
    }

    return <>{children}</>
} 