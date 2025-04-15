import { SignUp } from "@clerk/nextjs";

export default function Register() {
    return (
        <div className="bg-zinc-100 w-screen h-screen grid place-items-center">
            <SignUp />
        </div>
    );
}
