import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DocumentPage({
    params,
}: {
    params: { id: string }
}) {
    const { userId } = auth()

    // For development/testing, allow access without authentication
    if (!userId && process.env.NODE_ENV === "production") {
        redirect("/")
    }

    // Mock document data
    const document = {
        id: params.id,
        title: "Project Documentation",
        content: `# Project Documentation

## Introduction
This document provides comprehensive documentation for our project.

## Features
- Feature 1
- Feature 2
- Feature 3

## Getting Started
Follow these steps to get started with the project.

## API Reference
Detailed information about the API endpoints.`,
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
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <nav className="flex items-center space-x-2">
                            <Button variant="outline">Save</Button>
                            <Button>Ask AI</Button>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-1 space-y-4 p-8 pt-6">
                <div className="mx-auto max-w-4xl space-y-8">
                    <div className="space-y-2">
                        <input
                            type="text"
                            defaultValue={document.title}
                            className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-2 text-2xl font-bold shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="grid gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <textarea
                                    defaultValue={document.content}
                                    className="flex min-h-[500px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline">Preview</Button>
                                <Button>Export</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
} 