"use client"

import { useRef } from "react"
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion"

/**
 * VelocityScroll — wraps children and applies a subtle X skew/scale
 * based on scroll velocity (faster scroll = more effect).
 * Great for marquee rows to feel "alive."
 */
export function VelocityScroll({
    children,
    className = "",
}: {
    children: React.ReactNode
    className?: string
}) {
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    })

    // Map velocity → subtle skewX (max ±6deg) and scale
    const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [-6, 0, 6])
    const scaleX = useTransform(smoothVelocity, [-2000, 0, 2000], [0.96, 1, 0.96])

    return (
        <motion.div
            className={className}
            style={{ skewX, scaleX, transformOrigin: "center center" }}
        >
            {children}
        </motion.div>
    )
}
