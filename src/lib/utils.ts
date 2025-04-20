import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GoogleGenAI } from "@google/genai";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getModel(content: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{
      parts: [{ text: content }]
    }],
  });

  return await response;
}
