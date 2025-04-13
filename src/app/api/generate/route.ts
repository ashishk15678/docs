import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function POST(req: Request) {
    try {
        const { userId } = auth()

        // For development/testing, allow requests without authentication
        if (!userId && process.env.NODE_ENV === "production") {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json()
        const { prompt, title } = body

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 })
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        const result = await model.generateContent(
            `You are a professional documentation writer. Create well-structured, clear, and comprehensive documentation based on the following request. Use markdown formatting.

Request: ${prompt}
Title: ${title || "Untitled Document"}

Please create detailed documentation with proper sections, examples, and explanations.`
        )

        const response = await result.response
        const generatedContent = response.text()

        return NextResponse.json({ content: generatedContent })
    } catch (error) {
        console.error("[GENERATE_ERROR]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
} 