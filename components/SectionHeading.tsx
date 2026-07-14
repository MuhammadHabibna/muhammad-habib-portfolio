"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
    title: string
    subtitle?: string
    gradient?: string
    align?: "center" | "left"
}

export function SectionHeading({
    title,
    subtitle,
    gradient = "from-indigo-600 to-indigo-600",
    align = "center",
}: SectionHeadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className={align === "center" ? "flex flex-col items-center mb-12 text-center space-y-4" : "space-y-4 mb-12"}
        >
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}>
                {title}
            </h2>
            {subtitle && (
                <p className="text-muted-foreground text-lg max-w-2xl">
                    {subtitle}
                </p>
            )}
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                viewport={{ once: true }}
                className="h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-full"
            />
        </motion.div>
    )
}
