"use client"

import { useState } from "react"
import { Bot, Send, X, Sparkles, Copy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

interface AiPanelProps {
    editorContent: string
    onInsertContent: (content: string) => void
}

export default function AiPanel({ editorContent, onInsertContent }: AiPanelProps) {
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [suggestions, setSuggestions] = useState<string[]>([
        "Summarize this document",
        "Improve the writing style",
        "Fix grammar and spelling",
        "Make it more concise",
        "Generate a conclusion",
    ])

    const [responses, setResponses] = useState<Array<{ role: string; content: string }>>([
        {
            role: "assistant",
            content: "Hello! I'm your AI writing assistant. How can I help you with your document today?",
        },
    ])

    const handleSendPrompt = () => {
        if (!prompt.trim()) return

        // Add user message to chat
        setResponses((prev) => [...prev, { role: "user", content: prompt }])

        // Simulate AI response
        setIsLoading(true)
        setTimeout(() => {
            const aiResponse = `Here's a response to your prompt: "${prompt}". I've analyzed your document and can provide suggestions to improve it.`
            setResponses((prev) => [...prev, { role: "assistant", content: aiResponse }])
            setIsLoading(false)
        }, 1500)

        setPrompt("")
    }

    const handleSuggestionClick = (suggestion: string) => {
        setPrompt(suggestion)
        handleSendPrompt()
    }

    const handleInsertContent = (content: string) => {
        onInsertContent(content)
    }

    return (
        <div className="w-80 border-l border-slate-200 bg-white/60 backdrop-blur-md flex flex-col">
            <div className="p-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center">
                    <Bot size={18} className="text-purple-500 mr-2" />
                    <h3 className="font-medium">AI Assistant</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                    <X size={16} />
                </Button>
            </div>

            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <TabsList className="grid grid-cols-2 mx-3 mt-2">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                    <div className="flex-1 overflow-auto p-3 space-y-4">
                        {responses.map((message, index) => (
                            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[85%] p-3 rounded-2xl ${message.role === "user"
                                        ? "bg-purple-500 text-white rounded-tr-none"
                                        : "bg-slate-100 text-slate-800 rounded-tl-none"
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>

                                    {message.role === "assistant" && (
                                        <div className="flex items-center justify-end mt-1 space-x-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 rounded-full opacity-70 hover:opacity-100"
                                                onClick={() => handleInsertContent(message.content)}
                                            >
                                                <ArrowRight size={12} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 rounded-full opacity-70 hover:opacity-100"
                                                onClick={() => navigator.clipboard.writeText(message.content)}
                                            >
                                                <Copy size={12} />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-100 text-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
                                    <div className="flex space-x-1">
                                        <div
                                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0ms" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "150ms" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "300ms" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-slate-200">
                        <div className="flex items-center space-x-2">
                            <Input
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendPrompt()}
                                placeholder="Ask AI assistant..."
                                className="bg-slate-100 border-0 focus-visible:ring-purple-500"
                            />
                            <Button
                                size="icon"
                                onClick={handleSendPrompt}
                                disabled={!prompt.trim() || isLoading}
                                className="bg-purple-500 hover:bg-purple-600 text-white rounded-full h-9 w-9"
                            >
                                <Send size={16} />
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="suggestions" className="flex-1 overflow-auto p-3 space-y-3 m-0">
                    <p className="text-sm text-slate-500">Try these suggestions based on your document:</p>

                    {suggestions.map((suggestion, index) => (
                        <Card
                            key={index}
                            className="p-3 cursor-pointer hover:bg-slate-50 transition-colors border border-slate-200 bg-white/80 backdrop-blur-sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <div className="flex items-start space-x-2">
                                <Sparkles size={16} className="text-purple-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">{suggestion}</p>
                                    <p className="text-xs text-slate-500 mt-1">Click to generate</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}
