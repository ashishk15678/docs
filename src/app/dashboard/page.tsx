import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
    const { userId } = auth()

    // For development/testing, allow access without authentication
    if (!userId && process.env.NODE_ENV === "production") {
        redirect("/")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 flex">
                        <Link href="/" className="mr-6 flex items-center space-x-2">
                            <span className="font-bold">AI Docs</span>
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <nav className="flex items-center space-x-2">
                            <Link href="/dashboard/new">
                                <Button>New Document</Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Your Documents</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Mock documents for now */}
                    {mockDocuments.map((doc) => (
                        <div
                            key={doc.id}
                            className="rounded-lg border bg-card text-card-foreground shadow-sm"
                        >
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold">{doc.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {doc.description}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-muted-foreground">
                                            Last updated: {doc.lastUpdated}
                                        </span>
                                    </div>
                                    <Link href={`/dashboard/documents/${doc.id}`}>
                                        <Button variant="outline" size="sm">
                                            Open
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

const mockDocuments = [
    {
        id: "1",
        title: "Project Documentation",
        description: "Complete documentation for the main project features and APIs",
        lastUpdated: "2 hours ago",
    },
    {
        id: "2",
        title: "User Guide",
        description: "Comprehensive guide for end-users with step-by-step instructions",
        lastUpdated: "1 day ago",
    },
    {
        id: "3",
        title: "API Reference",
        description: "Detailed API documentation with examples and endpoints",
        lastUpdated: "3 days ago",
    },
] 