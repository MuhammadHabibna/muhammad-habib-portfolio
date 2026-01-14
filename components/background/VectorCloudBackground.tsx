"use client";

import { motion } from "framer-motion";

export function VectorCloudBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-50/50 dark:bg-slate-950/50">
            {/* Abstract Shapes */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute w-full h-full"
            >
                {/* Top Right Blob */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-600/10 blur-[100px] rounded-full"
                />

                {/* Bottom Left Blob */}
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-indigo-400/10 dark:bg-indigo-600/10 blur-[120px] rounded-full"
                />

                {/* Center Floating Shapes (Vector-like) */}
                <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20">
                    <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />

                    <motion.circle
                        cx="80%" cy="20%" r="50"
                        fill="currentColor"
                        className="text-sky-200 dark:text-sky-900"
                        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                        cx="10%" cy="60%" r="80"
                        fill="currentColor"
                        className="text-indigo-100 dark:text-indigo-900"
                        animate={{ y: [0, 50, 0], x: [0, -20, 0] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>
            </motion.div>
        </div>
    );
}
