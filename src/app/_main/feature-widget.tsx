"use client"

import { motion } from "framer-motion"

interface FeatureWidgetProps {
    title: string
    description: string
    icon: string
}

export function FeatureWidget({ title, description, icon }: FeatureWidgetProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="bg-white/50 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:bg-white/70">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="text-4xl mb-6 relative z-10">{icon}</div>

                <h3 className="text-xl font-bold mb-3 relative z-10">{title}</h3>

                <p className="text-gray-600 relative z-10">{description}</p>

                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100/50 to-white/20 rounded-tl-[100px] -mr-12 -mb-12 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
            </div>
        </motion.div>
    )
}
