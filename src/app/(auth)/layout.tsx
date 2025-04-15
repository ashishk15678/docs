export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div className="bg-zinc-100 w-screen h-screen grid place-items-center">{children}</div>;
}
