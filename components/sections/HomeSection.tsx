"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mail, FolderOpen, ExternalLink, Github, Linkedin, Instagram, ChevronDown } from "lucide-react"
import { type Profile, type SocialLink } from "@/types"

interface HomeSectionProps {
    profile?: Profile | null
    socials?: SocialLink[]
}

const socialIcons: Record<string, React.ReactNode> = {
    github:    <Github className="w-5 h-5" />,
    linkedin:  <Linkedin className="w-5 h-5" />,
    instagram: <Instagram className="w-5 h-5" />,
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
}
const stagger = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

export function HomeSection({ profile, socials }: HomeSectionProps) {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
    const y       = useTransform(scrollYProgress, [0, 1], [0, 80])
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    const fullName   = profile?.full_name  || "Your Name"
    const headline   = profile?.headline   || "AI Engineer"
    const tagline    = profile?.tagline    || "Building intelligent systems that create real-world impact."
    const avatarUrl  = profile?.profile_photo || ""
    const cvUrl      = profile?.cv_url     || "#"
    const email      = profile?.contact_email || ""

    // Split name into two lines — first half / second half
    const words    = fullName.split(" ")
    const mid      = Math.ceil(words.length / 2)
    const nameLine1 = words.slice(0, mid).join(" ")
    const nameLine2 = words.slice(mid).join(" ")

    return (
        <section
            ref={ref}
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Gradient bg — subtle, not noisy */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-background to-teal-50/30 dark:from-indigo-950/20 dark:via-background dark:to-teal-950/10" />

            {/* Dot grid — very subtle */}
            <div
                className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Soft glow blobs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 w-full"
            >
                <div className="max-w-6xl mx-auto px-8 lg:px-16 pt-28 pb-20">
                    <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">

                        {/* ── LEFT: Text content ────────────────────── */}
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={stagger}
                            className="space-y-8 max-w-2xl"
                        >
                            {/* "Hello, I am" label */}
                            <motion.p
                                variants={item}
                                className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500"
                            >
                                Hello, I am
                            </motion.p>

                            {/* Name — very large, clean */}
                            <motion.div variants={item} className="space-y-1">
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-[0.95] text-slate-900 dark:text-white">
                                    {nameLine1}
                                </h1>
                                {nameLine2 && (
                                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-[0.95] bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500">
                                        {nameLine2}.
                                    </h1>
                                )}
                            </motion.div>

                            {/* Headline pill */}
                            <motion.div variants={item}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-semibold text-base">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                                    {headline}
                                </span>
                            </motion.div>

                            {/* Tagline */}
                            <motion.p
                                variants={item}
                                className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light max-w-lg"
                            >
                                {tagline}
                            </motion.p>

                            {/* Social icons row */}
                            <motion.div variants={item} className="flex items-center gap-3">
                                {socials?.map((s) => {
                                    const icon = socialIcons[s.platform.toLowerCase()]
                                    return (
                                        <a
                                            key={s.id}
                                            href={s.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={s.platform}
                                            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-200"
                                        >
                                            {icon ?? <ExternalLink className="w-4 h-4" />}
                                        </a>
                                    )
                                })}
                                {email && (
                                    <a
                                        href={`mailto:${email}`}
                                        title="Email"
                                        className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-200"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </a>
                                )}
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
                                <Button
                                    size="lg"
                                    className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all duration-200"
                                    asChild
                                >
                                    <a href="#projects">
                                        <FolderOpen className="mr-2 h-4 w-4" />
                                        View Projects
                                    </a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full px-8 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
                                    asChild
                                >
                                    <a href="#contact">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Contact Me
                                    </a>
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* ── RIGHT: Photo card ─────────────────────── */}
                        {avatarUrl && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, x: 30 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                                className="relative hidden lg:block"
                            >
                                {/* Glow ring */}
                                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-teal-500/20 rounded-[2.5rem] blur-2xl" />

                                <motion.div
                                    whileHover={{ scale: 1.02, rotate: 0 }}
                                    initial={{ rotate: -2 }}
                                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                                    className="relative w-72 aspect-[3/4] rounded-[2rem] overflow-hidden border-2 border-white/60 dark:border-slate-700/60 shadow-2xl"
                                >
                                    <img
                                        src={avatarUrl}
                                        alt={fullName}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                {/* Floating chip: Open to work */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="absolute -bottom-4 -left-6 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl"
                                >
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Open to work</span>
                                </motion.div>

                                {/* Floating chip: role badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.95 }}
                                    className="absolute -top-3 -right-4 px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30"
                                >
                                    {headline}
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            >
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>
            </motion.div>
        </section>
    )
}
