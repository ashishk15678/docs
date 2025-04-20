import { NextResponse } from "next/server";
import { getModel } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        let content = "";

        // get the content from the request
        try {
            const body = await req.json();
            content = body.content;
            if (!content) {
                return new Response("Content is required", { status: 400 });
            }
            console.log({ content });
        } catch (error) {
            console.error(error);
            return new Response("Error fetching content", { status: 500 });
        }

        // fetch the content from the AI
        try {
            const response = await getModel(content);
            return NextResponse.json({ body: response.text });
        } catch (error) {
            console.error(error);
            return new Response("Error fetching content from AI", { status: 500 });
        }

    } catch (error) {
        console.error(error);
        return new Response("Some error occurred", { status: 500 });
    }
}