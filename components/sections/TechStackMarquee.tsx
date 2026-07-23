"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { VelocityScroll } from "@/components/VelocityScroll"

// ── Tech items: name + devicon image URL ──────────────────────────────────────
const ROW_1 = [
    { name: "Python",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "TensorFlow",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
    { name: "React",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Next.js",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "Tailwind CSS",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Node.js",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
]

const ROW_2 = [
    { name: "PostgreSQL",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "Supabase",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
    { name: "Docker",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "Git",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "Figma",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
    { name: "OpenCV",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
    { name: "Scikit-learn",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
    { name: "Pandas",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
]

// ── Single card ───────────────────────────────────────────────────────────────
function TechCard({ name, icon }: { name: string; icon: string }) {
    return (
        <div className="
            flex items-center gap-3 px-5 py-3.5
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700/80
            rounded-2xl shadow-sm
            hover:border-indigo-300 dark:hover:border-indigo-700
            hover:shadow-md hover:shadow-indigo-500/10
            transition-all duration-200
            cursor-default select-none
            flex-shrink-0
        ">
            <img
                src={icon}
                alt={name}
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
                loading="lazy"
            />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                {name}
            </span>
        </div>
    )
}

// ── Infinite marquee row ───────────────────────────────────────────────────────
function MarqueeRow({
    items,
    direction = "left",
    speed = 35,
}: {
    items: typeof ROW_1
    direction?: "left" | "right"
    speed?: number
}) {
    // Triple the items for seamless loop
    const repeated = [...items, ...items, ...items, ...items]

    return (
        <div className="relative overflow-hidden w-full">
            {/* Left fade mask */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none
                bg-gradient-to-r from-background to-transparent" />
            {/* Right fade mask */}
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none
                bg-gradient-to-l from-background to-transparent" />

            <motion.div
                className="flex gap-4 w-max"
                animate={{
                    x: direction === "left"
                        ? ["0%", `-${100 / 4}%`]  // scroll left
                        : [`-${100 / 4}%`, "0%"], // scroll right
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
            >
                {repeated.map((tech, i) => (
                    <TechCard key={`${tech.name}-${i}`} {...tech} />
                ))}
            </motion.div>
        </div>
    )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function TechStackMarquee() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], [40, -40])

    return (
        <section
            ref={ref}
            id="techstack"
            className="relative py-20 overflow-hidden"
        >
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ y }}
                className="text-center mb-12 px-4"
            >
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-slate-400 dark:text-slate-500 mb-3">
                    Tools & Technologies
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    My Tech Stack
                </h2>
            </motion.div>

            {/* Velocity-aware marquee rows */}
            <VelocityScroll>
                {/* Row 1 — scrolls left */}
                <div className="mb-4">
                    <MarqueeRow items={ROW_1} direction="left" speed={30} />
                </div>

                {/* Row 2 — scrolls right (opposite) */}
                <MarqueeRow items={ROW_2} direction="right" speed={25} />
            </VelocityScroll>
        </section>
    )
}
