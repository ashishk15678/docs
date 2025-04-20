"use client"
import dynamic from "next/dynamic";
import { Suspense } from "react";

// tiptap has hydration errors when rendered on the server
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function Home() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center text-4xl">Loading...</div>}>
      <Editor />
    </Suspense>
  );
}
