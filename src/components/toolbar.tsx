"use client"

import type React from "react"

import { useState } from "react"
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    ImageIcon,
    Link,
    Heading1,
    Heading2,
    ChevronDown,
    Bot,
    Save,
    FileText,
    Settings,
    MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type FormatOption =
    | "bold"
    | "italic"
    | "underline"
    | "align-left"
    | "align-center"
    | "align-right"
    | "bullet-list"
    | "numbered-list"
    | "link"
    | "image"
    | "paragraph"
    | "heading1"
    | "heading2"



interface ToolbarProps {
    onFormatChange: (option: FormatOption) => void
    onToggleAiPanel: () => void
    showAiPanel: boolean
}

export default function Toolbar({ onFormatChange, onToggleAiPanel, showAiPanel }: ToolbarProps) {
    const [documentName, setDocumentName] = useState("Untitled Document")
    const [isEditing, setIsEditing] = useState(false)

    const formatOptions = [
        { icon: <Bold size={18} />, value: "bold", tooltip: "Bold (Ctrl+B)" },
        { icon: <Italic size={18} />, value: "italic", tooltip: "Italic (Ctrl+I)" },
        { icon: <Underline size={18} />, value: "underline", tooltip: "Underline (Ctrl+U)" },
        { icon: <AlignLeft size={18} />, value: "align-left", tooltip: "Align Left" },
        { icon: <AlignCenter size={18} />, value: "align-center", tooltip: "Align Center" },
        { icon: <AlignRight size={18} />, value: "align-right", tooltip: "Align Right" },
    ]

    const handleDocumentNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false)
        }
    }

    return (
        <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <FileText size={20} />
                    </Button>

                    {isEditing ? (
                        <input
                            type="text"
                            value={documentName}
                            onChange={(e) => setDocumentName(e.target.value)}
                            onKeyDown={handleDocumentNameChange}
                            onBlur={() => setIsEditing(false)}
                            autoFocus
                            className="bg-transparent border-b border-slate-300 focus:border-slate-500 outline-none px-1 py-0.5 text-lg font-medium"
                        />
                    ) : (
                        <h1 className="text-lg font-medium cursor-pointer hover:text-slate-700" onClick={() => setIsEditing(true)}>
                            {documentName}
                        </h1>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                        <Save size={18} className="mr-1" />
                        Save
                    </Button>

                    <Button
                        variant={showAiPanel ? "default" : "outline"}
                        size="sm"
                        onClick={onToggleAiPanel}
                        className={showAiPanel ? "bg-purple-500 hover:bg-purple-600 text-white" : ""}
                    >
                        <Bot size={18} className="mr-1" />
                        AI Assistant
                    </Button>

                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Settings size={18} />
                    </Button>
                </div>
            </div>

            <div className="flex items-center px-4 py-1 border-t border-slate-100 overflow-x-auto">
                <TooltipProvider>
                    <div className="flex items-center space-x-1 mr-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex items-center">
                                    <span className="mr-1">Paragraph</span>
                                    <ChevronDown size={14} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                className="bg-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg"
                            >
                                <DropdownMenuItem onClick={() => onFormatChange("paragraph")}>Paragraph</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onFormatChange("heading1")}>
                                    <Heading1 size={16} className="mr-2" /> Heading 1
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onFormatChange("heading2")}>
                                    <Heading2 size={16} className="mr-2" /> Heading 2
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center space-x-1 border-r border-slate-200 pr-4 mr-4">
                        {formatOptions.map((option) => (
                            <Tooltip key={option.value}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-lg"
                                        onClick={() => onFormatChange(option.value as FormatOption)}
                                    >
                                        {option.icon}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>{option.tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>

                    <div className="flex items-center space-x-1">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg"
                                    onClick={() => onFormatChange("bullet-list")}
                                >
                                    <List size={18} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Bullet List</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg"
                                    onClick={() => onFormatChange("numbered-list")}
                                >
                                    <ListOrdered size={18} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Numbered List</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg"
                                    onClick={() => onFormatChange("link")}
                                >
                                    <Link size={18} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Insert Link</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg"
                                    onClick={() => onFormatChange("image")}
                                >
                                    <ImageIcon size={18} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Insert Image</p>
                            </TooltipContent>
                        </Tooltip>

                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreHorizontal size={18} />
                        </Button>
                    </div>
                </TooltipProvider>
            </div>
        </div>
    )
}
