import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <ClerkLoading>
                <div className="flex h-screen w-screen items-center justify-center gap-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />

                </div>
            </ClerkLoading>
            <ClerkLoaded>
                <SignIn />
            </ClerkLoaded>
        </div>
    )
}