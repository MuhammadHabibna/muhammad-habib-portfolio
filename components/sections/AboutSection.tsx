"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { type Profile, type Project, type Achievement, type Certification } from "@/types"
import { PDFDownloadButton } from "@/components/PDFDownloadButton"
import { type SocialLink } from "@/types"

interface AboutSectionProps {
    profile?: Profile | null
    socials?: SocialLink[]
    projects?: Project[]
    achievements?: Achievement[]
    certifications?: Certification[]
    counts?: {
        projects: number
        certifications: number
        achievements: number
    }
}

function Counter({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
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
        let startTime: number
        const duration = 1400
        const animate = (now: number) => {
            if (!startTime) startTime = now
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [inView, target])

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-teal-500 font-mono">
                {count}{suffix}
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">
                {label}
            </div>
        </div>
    )
}

export function AboutSection({
    profile, socials = [], projects = [], achievements = [], certifications = [], counts
}: AboutSectionProps) {
    const fullName  = profile?.full_name || "Your Name"
    const headline  = profile?.headline  || "AI Engineer"
    const bioShort  = profile?.bio_short || "I am passionate about building things."
    const avatarUrl = profile?.profile_photo || ""
    const cvUrl     = profile?.cv_url    || "#"

    const words    = fullName.split(" ")
    const mid      = Math.ceil(words.length / 2)
    const firstName = words.slice(0, mid).join(" ")
    const lastName  = words.slice(mid).join(" ")

    return (
        <section id="about" className="relative py-28 overflow-hidden bg-white dark:bg-slate-950">
            {/* Very light top separator line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="max-w-6xl mx-auto px-8 lg:px-16">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">

                    {/* ── LEFT: Photo ───────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="relative"
                    >
                        {avatarUrl ? (
                            <>
                                <div className="absolute -inset-6 bg-gradient-to-br from-indigo-100 to-teal-100 dark:from-indigo-950/40 dark:to-teal-950/40 rounded-[2.5rem] blur-xl opacity-60" />
                                <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl aspect-[3/4] bg-slate-100 dark:bg-slate-900">
                                    <img
                                        src={avatarUrl}
                                        alt={fullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="relative rounded-[2rem] aspect-[3/4] bg-gradient-to-br from-indigo-100 to-teal-50 dark:from-indigo-950/30 dark:to-teal-950/20 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                                <span className="text-6xl font-extrabold text-indigo-200 dark:text-indigo-900 select-none">
                                    {fullName.charAt(0)}
                                </span>
                            </div>
                        )}
                    </motion.div>

                    {/* ── RIGHT: Content ─────────────────────────────── */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.1 } },
                        }}
                        className="space-y-8"
                    >
                        {/* "I AM [NAME]" styled blocks */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            className="space-y-3"
                        >
                            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">
                                About me
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">I AM</span>
                                <span className="px-4 py-1.5 rounded-lg bg-indigo-500 text-white text-2xl font-bold tracking-tight">
                                    {firstName.toUpperCase()}
                                </span>
                                {lastName && (
                                    <span className="px-4 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-2xl font-bold tracking-tight">
                                        {lastName.toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div className="inline-flex">
                                <span className="px-4 py-1.5 rounded-lg bg-teal-500 text-white text-lg font-bold tracking-wider uppercase">
                                    {headline}
                                </span>
                            </div>
                        </motion.div>

                        {/* Bio — left accent bar */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            className="pl-5 border-l-4 border-indigo-200 dark:border-indigo-800 space-y-4"
                        >
                            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                {bioShort}
                            </p>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            className="grid grid-cols-3 gap-4 py-6 border-t border-b border-slate-100 dark:border-slate-800/80"
                        >
                            <Counter target={counts?.projects || 0}       label="Projects"    />
                            <Counter target={counts?.achievements || 0}    label="Awards"      />
                            <Counter target={counts?.certifications || 0}  label="Certs"       />
                        </motion.div>

                        {/* CTA — Download CV */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                            className="flex flex-wrap gap-3"
                        >
                            <Button
                                size="lg"
                                className="rounded-full px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 font-bold uppercase tracking-wider shadow-lg transition-all"
                                asChild
                            >
                                <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download CV
                                </a>
                            </Button>
                            <PDFDownloadButton
                                profile={profile || { id: "", full_name: fullName, headline, tagline: null, bio_short: bioShort, bio_long: null, location: null, profile_photo: null, banner_image: null, cv_url: null, contact_email: null }}
                                socials={socials}
                                projects={projects}
                                achievements={achievements}
                                organizations={[]}
                                certifications={certifications}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
