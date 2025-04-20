import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <UserButton />
            <h1>Hello World</h1>
        </div>
    )
}