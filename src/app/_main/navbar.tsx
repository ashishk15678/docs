"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-lg border-b border-gray-100/50 shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center mr-2 font-bold">
                                DM
                            </div>
                            <span className="text-xl font-bold text-gray-900">DocuMind</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/templates" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                            Templates
                        </Link>
                        <Link href="/features" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                            Pricing
                        </Link>
                        <Link href="/docs" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                            Docs
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" className="text-sm font-medium">
                            <Link href="/login">Sign in</Link>
                        </Button>
                        <Button className="bg-black hover:bg-gray-800 text-white text-sm font-medium">
                            <Link href="/signup">Get started</Link>
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t bg-white/90 backdrop-blur-md">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/templates"
                                className="text-gray-600 hover:text-black transition-colors px-4 py-2 text-sm font-medium"
                            >
                                Templates
                            </Link>
                            <Link
                                href="/features"
                                className="text-gray-600 hover:text-black transition-colors px-4 py-2 text-sm font-medium"
                            >
                                Features
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-gray-600 hover:text-black transition-colors px-4 py-2 text-sm font-medium"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/docs"
                                className="text-gray-600 hover:text-black transition-colors px-4 py-2 text-sm font-medium"
                            >
                                Docs
                            </Link>
                            <div className="flex flex-col space-y-2 px-4 pt-2">
                                <Button variant="ghost" className="w-full justify-start text-sm font-medium">
                                    <Link href="/login" className="w-full">
                                        Sign in
                                    </Link>
                                </Button>
                                <Button className="w-full bg-black hover:bg-gray-800 text-white text-sm font-medium">
                                    <Link href="/signup" className="w-full">
                                        Get started
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
