"use client"

import { motion } from "framer-motion"

export function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
            {children}
        </motion.div>
    )
}
