"use client"

import {
    Copy,
    Scissors,
    Trash,
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link,
    ImageIcon,
} from "lucide-react"

interface ContextMenuProps {
    x: number
    y: number
    onClose: () => void
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
    const menuItems = [
        {
            icon: <Copy size={16} />,
            label: "Copy",
            action: () => navigator.clipboard.writeText(window.getSelection()?.toString() || ""),
        },
        { icon: <Scissors size={16} />, label: "Cut", action: () => document.execCommand("cut") },
        { icon: <Trash size={16} />, label: "Delete", action: () => document.execCommand("delete") },
        { type: "divider" },
        { icon: <Bold size={16} />, label: "Bold", action: () => document.execCommand("bold") },
        { icon: <Italic size={16} />, label: "Italic", action: () => document.execCommand("italic") },
        { icon: <Underline size={16} />, label: "Underline", action: () => document.execCommand("underline") },
        { type: "divider" },
        { icon: <AlignLeft size={16} />, label: "Align Left", action: () => document.execCommand("justifyLeft") },
        { icon: <AlignCenter size={16} />, label: "Align Center", action: () => document.execCommand("justifyCenter") },
        { icon: <AlignRight size={16} />, label: "Align Right", action: () => document.execCommand("justifyRight") },
        { type: "divider" },
        {
            icon: <Link size={16} />,
            label: "Insert Link",
            action: () => {
                const url = prompt("Enter URL:")
                if (url) document.execCommand("createLink", false, url)
            },
        },
        {
            icon: <ImageIcon size={16} />,
            label: "Insert Image",
            action: () => {
                const url = prompt("Enter image URL:")
                if (url) document.execCommand("insertImage", false, url)
            },
        },
    ]

    const handleItemClick = (action: () => void) => {
        action()
        onClose()
    }

    // Adjust position to keep menu in viewport
    const adjustedPosition = {
        x: Math.min(x, window.innerWidth - 200),
        y: Math.min(y, window.innerHeight - 400),
    }

    return (
        <div
            className="fixed z-50 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/20 w-48 py-1 overflow-hidden"
            style={{
                left: adjustedPosition.x,
                top: adjustedPosition.y,
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="max-h-96 overflow-auto">
                {menuItems.map((item, index) =>
                    item.type === "divider" ? (
                        <div key={index} className="h-px bg-slate-200 my-1 mx-2" />
                    ) : (
                        <button
                            key={index}
                            className="w-full text-left px-3 py-1.5 text-sm flex items-center space-x-2 hover:bg-slate-100 transition-colors"
                            onClick={() => handleItemClick(item.action || (() => { }))}
                        >
                            <span className="text-slate-500">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ),
                )}
            </div>
        </div>
    )
}
