import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function NewDocumentPage() {
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
                        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
                            <span className="font-bold">AI Docs</span>
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex-1 space-y-4 p-8 pt-6">
                <div className="mx-auto max-w-4xl space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Create New Document</h1>
                        <p className="text-muted-foreground">
                            Use AI to help you create professional documentation
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="title"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Document Title
                                </label>
                                <input
                                    id="title"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter document title"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="prompt"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    What would you like to create?
                                </label>
                                <textarea
                                    id="prompt"
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Describe what kind of document you want to create. For example: 'Create a user guide for a mobile app with sections for installation, features, and troubleshooting'"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Link href="/dashboard">
                                    <Button variant="outline">Cancel</Button>
                                </Link>
                                <Button>Generate with AI</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 