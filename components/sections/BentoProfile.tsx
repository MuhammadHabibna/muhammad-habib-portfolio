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
            <div className="text-3xl md:text-4xl font-bold tracking-tight font-mono bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-teal-500">{count}</div>
            <div className="text-muted-foreground text-xs font-medium uppercase tracking-widest">{label}</div>
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
    const y = useTransform(scrollYProgress, [0, 1], [0, 120])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const nameWords = fullName.split(" ")
    const nameMid = Math.ceil(nameWords.length / 2)
    const nameLine1 = nameWords.slice(0, nameMid).join(" ")
    const nameLine2 = nameWords.slice(nameMid).join(" ")

    const stagger = {
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    }
    const item = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
    }

    return (
        <section ref={sectionRef} id="about" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
            {/* Background accents */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100 via-background to-background dark:from-indigo-950/30 dark:via-background dark:to-background" />
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }} />

            <motion.div style={{ y, opacity }} className="relative z-10 container px-4 md:px-6">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={stagger}
                    className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center"
                >
                    {/* Left: identity + description, all visible up front */}
                    <div className="text-center lg:text-left">
                        <motion.div variants={item} className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-950/40">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-widest">Available for work</span>
                        </motion.div>

                        <motion.h1
                            variants={item}
                            className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-[1.05] mb-4 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white"
                        >
                            <span className="block">{nameLine1}</span>
                            {nameLine2 && <span className="block">{nameLine2}</span>}
                        </motion.h1>

                        <motion.p variants={item} className="text-xl md:text-2xl font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500">
                            {headline}
                        </motion.p>

                        <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-1.5 text-muted-foreground mb-6">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{location}</span>
                        </motion.div>

                        <motion.p variants={item} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                            {bioShort}
                        </motion.p>

                        <motion.div variants={item} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                            <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 text-white" asChild>
                                <a href={cvUrl || "/CV.pdf"} target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-5 w-5" /> Download CV
                                </a>
                            </Button>
                            <PDFDownloadButton
                                profile={profile || { id: "", full_name: fullName, headline: headline, tagline: null, bio_short: bioShort, bio_long: null, location: location, profile_photo: null, banner_image: null, cv_url: null, contact_email: null }}
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

                        <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-3 mb-10">
                            {socials?.map((s) => (
                                <Button key={s.id} variant="ghost" size="icon" className="rounded-full w-11 h-11 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 transition-all" asChild>
                                    <a href={s.url} target="_blank" rel="noopener" title={s.platform}>
                                        <ExternalLink className="w-5 h-5" />
                                        <span className="sr-only">{s.platform}</span>
                                    </a>
                                </Button>
                            ))}
                            <Button size="icon" className="rounded-full w-11 h-11 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20" asChild>
                                <a href={`mailto:${profile?.contact_email || ''}`} title="Email Me">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </Button>
                        </motion.div>

                        {/* Inline stat row instead of a heavy detached block */}
                        <motion.div variants={item} className="flex items-center justify-center lg:justify-start gap-8">
                            <AnimatedCounter target={counts?.projects || 0} label="Projects" />
                            <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                            <AnimatedCounter target={counts?.achievements || 0} label="Awards" />
                            <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                            <AnimatedCounter target={counts?.certifications || 0} label="Certs" />
                        </motion.div>
                    </div>

                    {/* Right: photo as a secondary, offset visual element */}
                    <motion.div
                        variants={item}
                        className="relative mx-auto lg:mx-0 w-full max-w-sm"
                    >
                        <div className="absolute -inset-6 bg-gradient-to-br from-indigo-500/20 to-teal-500/20 rounded-[2.5rem] blur-2xl" />
                        <motion.div
                            initial={{ rotate: -3 }}
                            whileHover={{ rotate: 0, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="relative rounded-[2rem] overflow-hidden border-4 border-white/80 dark:border-slate-800/80 shadow-2xl aspect-[4/5] bg-muted"
                        >
                            <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Floating badge chips for personality, not decoration-for-its-own-sake */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-4 py-3 border border-slate-100 dark:border-slate-800 flex items-center gap-2"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span className="text-sm font-semibold">Open to work</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.5 }}
                            whileHover={{ y: 4 }}
                            className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-2xl shadow-xl px-4 py-2.5 text-sm font-semibold"
                        >
                            AI Engineer
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
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
