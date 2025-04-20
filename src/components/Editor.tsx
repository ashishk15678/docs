"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Toolbar from "./toolbar"
import EditorContent from "./editor-content"
import AiPanel from "./ai-panel"
import ContextMenu from "./context-menu"

export default function Editor() {

    //types
    type FormatOption =
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

    interface EditorState {
        content: string
        selection: {
            index: number
            length: number
        } | null
    }

    //types end

    const [editorState, setEditorState] = useState<EditorState>({
        content: "",
        selection: null,
    })
    const [showAiPanel, setShowAiPanel] = useState(true)
    const [contextMenu, setContextMenu] = useState<{
        show: boolean
        x: number
        y: number
    }>({
        show: false,
        x: 0,
        y: 0,
    })

    const editorRef = useRef<HTMLDivElement>(null)

    const handleFormatChange = (option: FormatOption) => {
        // This will be handled by the TipTap editor
        console.log("Format changed:", option)
    }

    const handleContentChange = (content: string) => {
        setEditorState((prev) => ({ ...prev, content }))
    }

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        setContextMenu({
            show: true,
            x: e.clientX,
            y: e.clientY,
        })
    }

    const closeContextMenu = () => {
        setContextMenu((prev) => ({ ...prev, show: false }))
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (contextMenu.show) {
                closeContextMenu()
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [contextMenu.show])

    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
            <div
                className="flex-1 flex flex-col bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden"
                ref={editorRef}
            >
                <Toolbar
                    onFormatChange={handleFormatChange}
                    onToggleAiPanel={() => setShowAiPanel(!showAiPanel)}
                    showAiPanel={showAiPanel}
                />

                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 overflow-auto p-6" onContextMenu={handleContextMenu}>
                        <EditorContent onChange={handleContentChange} value={editorState.content} />
                    </div>

                    {showAiPanel && (
                        <AiPanel
                            editorContent={editorState.content}
                            onInsertContent={(content) => {
                                handleContentChange(editorState.content + content)
                            }}
                        />
                    )}
                </div>
            </div>

            {contextMenu.show && <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={closeContextMenu} />}
        </div>
    )
}
