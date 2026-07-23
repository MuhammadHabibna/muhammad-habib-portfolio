"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface StickySectionProps {
    children: React.ReactNode
    /** Stack index — 0 is the first section */
    index: number
    /** Total number of sticky sections */
    total: number
    /** Background color for the card peel effect */
    bgClass?: string
}

/**
 * StickySection — wraps a section in a sticky container.
 * As the next section scrolls in, this one gets pushed up,
 * subtly scaled down and faded, creating a "card stack" feel.
 */
export function StickySection({
    children,
    index,
    total,
    bgClass = "bg-white dark:bg-slate-950",
}: StickySectionProps) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    // Scale from 1 → 0.94 as this section scrolls out
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
    // Fade from 1 → 0.6
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6])
    // Slight Y push upward
    const y = useTransform(scrollYProgress, [0, 1], [0, -20])

    // Each sticky card is offset slightly so they peek from under the previous
    const topOffset = index * 64 // px gap per card level
    const zIndex = index + 1

    return (
        <div
            ref={ref}
            className="relative"
            style={{ zIndex, marginBottom: index < total - 1 ? "0" : "0" }}
        >
            <div
                className="sticky"
                style={{ top: `${topOffset}px` }}
            >
                <motion.div
                    style={{ scale, opacity, y }}
                    className={`relative w-full origin-top rounded-b-3xl overflow-hidden shadow-2xl ${bgClass}`}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    )
}
