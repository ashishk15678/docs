import { Button } from "@/components/ui/button"
import { BackgroundGrid } from "@/app/_main/background-grid"
import { UserAvatars } from "@/app/_main/user-avatars"
import { CompanyLogos } from "@/app/_main/company-logos"
import { FloatingObjects } from "@/app/_main/floating"
import { NavBar } from "@/app/_main/navbar"
import { DocumentPreview } from "@/app/_main/doc-preview"
import { FeatureWidget } from "@/app/_main/feature-widget"
import Link from "next/link"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white overflow-hidden">
            <NavBar />
            <BackgroundGrid />

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
                <div className="absolute left-0 top-0 w-1/4 h-full pointer-events-none">
                    <FloatingObjects position="left" />
                </div>

                <div className="absolute right-0 top-0 w-1/4 h-full pointer-events-none">
                    <FloatingObjects position="right" />
                </div>

                <div className="container px-4 mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center mb-6">
                            <span className="px-3 py-1 text-xs font-medium bg-black/5 text-black/80 rounded-full backdrop-blur-sm border border-black/10">
                                DocuMind launches v1.0
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 tracking-tight">
                            The better way
                            <br />
                            to create documents
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 text-center mb-10 max-w-3xl mx-auto">
                            A fully customizable document creation platform for researchers, professionals, and students building
                            beautiful documents where ideas come to life.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <Button
                                size="lg"
                                className="h-14 px-8 text-lg rounded-full bg-black hover:bg-gray-800 text-white w-full sm:w-auto"
                            >
                                <Link href="/create" className="flex items-center">
                                    Start creating
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 px-8 text-lg rounded-full border-gray-300 w-full sm:w-auto"
                            >
                                <Link href="/demo" className="flex items-center">
                                    Watch demo <span className="ml-2 text-xs">2 min</span>
                                </Link>
                            </Button>
                        </div>

                        <div className="relative mx-auto">
                            <DocumentPreview />
                            <UserAvatars />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Create documents that stand out</h2>
                        <p className="text-xl text-gray-600">
                            Beautiful typography, powerful AI assistance, and seamless collaboration make document creation
                            effortless.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureWidget
                            title="AI-Powered Writing"
                            description="Let our AI help you draft, edit, and perfect your documents with intelligent suggestions."
                            icon="✨"
                        />
                        <FeatureWidget
                            title="Gmail Integration"
                            description="Seamlessly connect with your Gmail account to import content and share your documents."
                            icon="📧"
                        />
                        <FeatureWidget
                            title="Collaborative Editing"
                            description="Work together in real-time with teammates and colleagues on any document."
                            icon="👥"
                        />
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-24">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by professionals</h2>
                        <p className="text-xl text-gray-600">
                            Join thousands of researchers, students, and professionals who create stunning documents with our
                            platform.
                        </p>
                    </div>

                    <CompanyLogos />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-gray-900 to-black text-white">
                <div className="container px-4 mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to transform your documents?</h2>
                        <p className="text-xl text-gray-300 mb-10">
                            No credit card required. Start creating beautiful documents today.
                        </p>
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white hover:bg-gray-100 text-black">
                            <Link href="/signup">Create your account</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
