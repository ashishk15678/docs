"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function DocumentPreview() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 300)

        return () => clearTimeout(timer)
    }, [])

    return (
        <motion.div
            className="relative mx-auto max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 40,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl">
                <div className="flex items-center p-4 border-b border-gray-100/50">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="mx-auto text-sm text-gray-500 font-medium">Research Paper - DocuMind</div>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <div className="h-8 w-3/4 bg-gray-100/80 rounded-md mb-2"></div>
                        <div className="h-4 w-1/3 bg-gray-100/80 rounded-md"></div>
                    </div>

                    <div className="space-y-2 mb-6">
                        <div className="h-3 w-full bg-gray-100/80 rounded-md"></div>
                        <div className="h-3 w-full bg-gray-100/80 rounded-md"></div>
                        <div className="h-3 w-5/6 bg-gray-100/80 rounded-md"></div>
                        <div className="h-3 w-full bg-gray-100/80 rounded-md"></div>
                        <div className="h-3 w-4/5 bg-gray-100/80 rounded-md"></div>
                    </div>

                    <div className="mb-6">
                        <div className="h-6 w-1/2 bg-gray-100/80 rounded-md mb-3"></div>
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-gray-100/80 rounded-md"></div>
                            <div className="h-3 w-full bg-gray-100/80 rounded-md"></div>
                            <div className="h-3 w-3/4 bg-gray-100/80 rounded-md"></div>
                        </div>
                    </div>

                    <div className="h-32 w-full bg-gray-100/80 rounded-md mb-6"></div>

                    <div className="space-y-2">
                        <div className="h-3 w-full bg-gray-100/80 rounded-md"></div>
                        <div className="h-3 w-full bg-gray-100/80 rounded-md"></div>
                        <div className="h-3 w-5/6 bg-gray-100/80 rounded-md"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
