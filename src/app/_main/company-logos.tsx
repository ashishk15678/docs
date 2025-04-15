"use client"

import { motion } from "framer-motion"

export function CompanyLogos() {
    const logos = [
        { name: "Google", icon: "G" },
        { name: "Microsoft", icon: "M" },
        { name: "Apple", icon: "A" },
        { name: "Amazon", icon: "a" },
        { name: "Meta", icon: "f" },
        { name: "IBM", icon: "IBM" },
    ]

    return (
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {logos.map((logo, index) => (
                <motion.div
                    key={index}
                    className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <div className="w-10 h-10 bg-gray-100/70 backdrop-blur-sm rounded-xl flex items-center justify-center font-semibold text-gray-500 border border-gray-200/50 shadow-sm">
                        {logo.icon}
                    </div>
                    <span className="font-medium text-sm">{logo.name}</span>
                </motion.div>
            ))}
        </div>
    )
}
