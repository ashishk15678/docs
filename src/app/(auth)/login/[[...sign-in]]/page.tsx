import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

export default function Login() {
    return (

        <div className="bg-zinc-100 w-screen h-screen grid place-items-center">
            <ClerkLoading>
                <div className="w-screen h-screen grid place-items-center">
                    <div className="w-10 h-10 bg-zinc-200 rounded-full animate-spin">Spinner</div>
                </div>
            </ClerkLoading>
            <ClerkLoaded>
                <SignIn />
            </ClerkLoaded>
        </div>
    );
}