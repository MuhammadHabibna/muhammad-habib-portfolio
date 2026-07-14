"use client";

import { motion } from "framer-motion";

export function VectorCloudBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

            {/* Mesh gradient orbs */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute w-full h-full"
            >
                {/* Top Right - Sky */}
                <motion.div
                    animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], x: [0, 20, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-indigo-400/15 dark:bg-indigo-600/8 blur-[120px] rounded-full"
                />

                {/* Bottom Left - Indigo */}
                <motion.div
                    animate={{ y: [0, 40, 0], scale: [1, 1.15, 1], x: [0, -30, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-48 -left-32 w-[700px] h-[700px] bg-indigo-400/12 dark:bg-indigo-600/8 blur-[140px] rounded-full"
                />

                {/* Center - Violet */}
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 30, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-violet-400/8 dark:bg-violet-600/5 blur-[100px] rounded-full"
                />

                {/* Mid Right - Cyan */}
                <motion.div
                    animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 8 }}
                    className="absolute top-2/3 right-1/4 w-[350px] h-[350px] bg-cyan-400/8 dark:bg-cyan-600/5 blur-[90px] rounded-full"
                />
            </motion.div>

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '256px 256px',
            }} />

            {/* Dot grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
                backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)',
                backgroundSize: '40px 40px'
            }} />
        </div>
    );
}
