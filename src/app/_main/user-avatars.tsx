"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

export function UserAvatars() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const avatars = [
        {
            name: "Sarah",
            position: { top: "10%", right: "-5%" },
            delay: 0.2,
            image: "/placeholder.svg?height=40&width=40",
            color: "bg-pink-100/70 border-pink-300/50",
        },
        {
            name: "Michael",
            position: { bottom: "15%", left: "-8%" },
            delay: 0.5,
            image: "/placeholder.svg?height=40&width=40",
            color: "bg-yellow-100/70 border-yellow-300/50",
        },
        {
            name: "Ahmed",
            position: { top: "30%", left: "-10%" },
            delay: 0.8,
            image: "/placeholder.svg?height=40&width=40",
            color: "bg-green-100/70 border-green-300/50",
        },
        {
            name: "Jessica",
            position: { bottom: "25%", right: "-7%" },
            delay: 1.1,
            image: "/placeholder.svg?height=40&width=40",
            color: "bg-blue-100/70 border-blue-300/50",
        },
    ]

    return (
        <div className="absolute inset-0 pointer-events-none">
            {isVisible &&
                avatars.map((avatar, index) => (
                    <motion.div
                        key={index}
                        className={`absolute ${avatar.color} backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center space-x-2 border shadow-sm`}
                        style={avatar.position as any}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: avatar.delay,
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                    >
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-white/80">
                            <Image
                                src={avatar.image || "/placeholder.svg"}
                                alt={avatar.name}
                                width={24}
                                height={24}
                                className="object-cover"
                            />
                        </div>
                        <span className="text-xs font-medium">{avatar.name}</span>
                    </motion.div>
                ))}
        </div>
    )
}
