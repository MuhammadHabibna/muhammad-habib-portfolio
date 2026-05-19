"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Download, ExternalLink, ChevronDown, Github, Linkedin } from "lucide-react"
import { type Profile, type SocialLink, type Project, type Achievement, type Organization, type Certification } from "@/types"
import { PDFDownloadButton } from "@/components/PDFDownloadButton"

interface BentoProfileProps {
    profile?: Profile | null
    socials?: SocialLink[]
    counts?: {
        projects: number
        certifications: number
        achievements: number
    }
    projects?: Project[]
    achievements?: Achievement[]
    organizations?: Organization[]
    certifications?: Certification[]
}

function AnimatedCounter({ target, label }: { target: number; label: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!inView) return
        let start = 0
        const duration = 1500
        const startTime = performance.now()
        const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [inView, target])

    return (
        <div ref={ref} className="text-center space-y-1">
            <div className="text-4xl md:text-5xl font-bold tracking-tight font-mono">{count}</div>
            <div className="text-sky-200 text-xs font-medium uppercase tracking-widest">{label}</div>
        </div>
    )
}

export function BentoProfile({ profile, socials, counts, projects = [], achievements = [], organizations = [], certifications = [] }: BentoProfileProps) {
    const fullName = profile?.full_name || "Portfolio Owner"
    const headline = profile?.headline || "Full Stack Engineer"
    const bioShort = profile?.bio_short || "Building digital experiences."
    const avatarUrl = profile?.profile_photo || "https://ui.shadcn.com/avatars/01.png"
    const location = profile?.location || "Indonesia"
    const cvUrl = profile?.cv_url
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const letterVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -90 },
        visible: (i: number) => ({
            opacity: 1, y: 0, rotateX: 0,
            transition: { delay: i * 0.04, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] }
        })
    }

    return (
        <section ref={sectionRef} id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Radial gradient bg */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-background to-background dark:from-sky-950/30 dark:via-background dark:to-background" />

            {/* Dot grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }} />

            <motion.div style={{ y, opacity }} className="relative z-10 container px-4 md:px-6 py-32">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Avatar with glow ring */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                        className="relative mb-8"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full blur-xl opacity-40 animate-pulse" />
                        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white/80 dark:border-slate-800/80 shadow-2xl overflow-hidden ring-4 ring-sky-500/20">
                            <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-emerald-500 w-5 h-5 rounded-full border-[3px] border-white dark:border-slate-900 shadow-lg" title="Available for work" />
                    </motion.div>

                    {/* Animated name - split into 2 lines */}
                    <div className="mb-4 overflow-hidden">
                        <motion.h1
                            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter"
                            aria-label={fullName}
                        >
                            {["Muhammad Habib", "Nur Aiman"].map((line, lineIdx) => (
                                <span key={lineIdx} className="block">
                                    {line.split("").map((char, i) => (
                                        <motion.span
                                            key={`${lineIdx}-${i}`}
                                            custom={lineIdx * 20 + i}
                                            variants={letterVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </motion.h1>
                    </div>

                    {/* Headline with typing feel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: fullName.length * 0.04 + 0.3, duration: 0.6 }}
                        className="mb-6"
                    >
                        <span className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500">
                            {headline}
                        </span>
                    </motion.div>

                    {/* Location */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: fullName.length * 0.04 + 0.6 }}
                        className="flex items-center gap-1.5 text-muted-foreground mb-6"
                    >
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{location}</span>
                    </motion.div>

                    {/* Bio */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: fullName.length * 0.04 + 0.8, duration: 0.6 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8"
                    >
                        {bioShort}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: fullName.length * 0.04 + 1.0, duration: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-4 mb-10"
                    >
                        <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-lg shadow-sky-500/25 text-white" asChild>
                            <a href={cvUrl || "/CV.pdf"} target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-5 w-5" /> Download CV
                            </a>
                        </Button>
                        <PDFDownloadButton
                            profile={profile || { id: "", full_name: fullName, headline: headline, bio_short: bioShort, bio_long: null, location: location, profile_photo: null, banner_image: null, cv_url: null, contact_email: null }}
                            socials={socials || []}
                            projects={projects}
                            achievements={achievements}
                            organizations={organizations}
                            certifications={certifications}
                        />
                        <Button size="lg" variant="outline" className="rounded-full px-8 border-slate-300 dark:border-slate-700" asChild>
                            <a href="#contact">
                                <Mail className="mr-2 h-5 w-5" /> Contact Me
                            </a>
                        </Button>
                    </motion.div>

                    {/* Social icons floating */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: fullName.length * 0.04 + 1.2, duration: 0.8 }}
                        className="flex items-center gap-3 mb-12"
                    >
                        {socials?.map((s, i) => (
                            <motion.div
                                key={s.id}
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                            >
                                <Button variant="ghost" size="icon" className="rounded-full w-11 h-11 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 transition-all" asChild>
                                    <a href={s.url} target="_blank" rel="noopener" title={s.platform}>
                                        <ExternalLink className="w-5 h-5" />
                                        <span className="sr-only">{s.platform}</span>
                                    </a>
                                </Button>
                            </motion.div>
                        ))}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: (socials?.length || 0) * 0.5, ease: "easeInOut" }}
                        >
                            <Button size="icon" className="rounded-full w-11 h-11 bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20" asChild>
                                <a href={`mailto:${profile?.contact_email || ''}`} title="Email Me">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: fullName.length * 0.04 + 1.4, duration: 0.6 }}
                        className="w-full max-w-lg mx-auto"
                    >
                        <div className="relative bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl p-6 md:p-8 shadow-2xl shadow-indigo-500/20 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
                            <div className="relative z-10 flex items-center justify-around text-white">
                                <AnimatedCounter target={counts?.projects || 0} label="Projects" />
                                <div className="w-px h-14 bg-white/20" />
                                <AnimatedCounter target={counts?.achievements || 0} label="Awards" />
                                <div className="w-px h-14 bg-white/20" />
                                <AnimatedCounter target={counts?.certifications || 0} label="Certs" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </motion.div>
        </section>
    )
}
