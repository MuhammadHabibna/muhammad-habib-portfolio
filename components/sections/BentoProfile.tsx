"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin, Download, ExternalLink } from "lucide-react"
import { type Profile, type SocialLink } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BentoProfileProps {
    profile?: Profile | null
    socials?: SocialLink[]
    counts?: {
        projects: number
        certifications: number
        achievements: number
    }
}

export function BentoProfile({ profile, socials, counts }: BentoProfileProps) {
    const fullName = profile?.full_name || "Portfolio Owner"
    const headline = profile?.headline || "Full Stack Engineer"
    const bioShort = profile?.bio_short || "Building digital experiences."
    const bioLong = profile?.bio_long || "I am a passionate developer..."
    const avatarUrl = profile?.profile_photo || "https://ui.shadcn.com/avatars/01.png"
    const location = profile?.location || "Indonesia"
    const cvUrl = profile?.cv_url

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <section className="py-24 container px-4 md:px-6 relative z-10">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
                {/* Card A: Profile (Left Column) */}
                <motion.div variants={item} className="md:col-span-1">
                    <Card className="h-full border-none shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-8 flex flex-col items-center text-center h-full justify-center space-y-6 relative z-10">
                            <div className="relative">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden">
                                    <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900" title="Available for work" />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                                    {fullName}
                                </h1>
                                <p className="text-sky-600 font-medium text-lg">{headline}</p>
                                <div className="flex items-center justify-center text-muted-foreground text-sm gap-1">
                                    <MapPin className="w-4 h-4" /> {location}
                                </div>
                            </div>

                            <div className="w-full pt-2">
                                <Button variant="outline" className="w-full rounded-full" asChild>
                                    <a href={cvUrl || "/CV.pdf"} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" /> Download CV
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Card B: About (Right Top - Spans 2 cols) */}
                <motion.div variants={item} className="md:col-span-2">
                    <Card className="h-full border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                        <CardContent className="p-8 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-8 h-1 bg-sky-500 rounded-full" />
                                <h2 className="text-2xl font-bold">About Me</h2>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {bioShort}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                {bioLong}
                            </p>

                            <div className="pt-4 mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="px-3 py-1">Full Stack</Badge>
                                    <Badge variant="secondary" className="px-3 py-1">System Design</Badge>
                                    <Badge variant="secondary" className="px-3 py-1">Cloud Architecture</Badge>
                                    <Badge variant="secondary" className="px-3 py-1">AI Integration</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Card C: Quick Links (Bottom Left) */}
                <motion.div variants={item} className="md:col-span-1">
                    <Card className="h-full border-none shadow-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        <CardContent className="p-6 flex flex-col justify-center h-full space-y-4">
                            <h3 className="font-semibold text-center mb-2">Connect</h3>
                            <div className="flex justify-center gap-4">
                                {socials?.map(s => (
                                    <Button key={s.id} variant="outline" size="icon" className="rounded-full w-12 h-12 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 hover:border-sky-200" asChild>
                                        <a href={s.url} target="_blank" rel="noopener" title={s.platform}>
                                            <ExternalLink className="w-5 h-5" />
                                            <span className="sr-only">{s.platform}</span>
                                        </a>
                                    </Button>
                                ))}
                                <Button variant="default" size="icon" className="rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg shadow-primary/20" asChild>
                                    <a href={`mailto:${profile?.contact_email || ''}`} title="Email Me">
                                        <Mail className="w-5 h-5" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Card D: Highlight Stats (Bottom Right - Spans 2 cols) */}
                <motion.div variants={item} className="md:col-span-2">
                    <Card className="h-full border-none shadow-lg bg-indigo-600 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                        <CardContent className="p-6 h-full flex items-center justify-around text-center relative z-10">
                            <div className="space-y-1">
                                <div className="text-4xl md:text-5xl font-bold tracking-tight">{counts?.projects || 0}</div>
                                <div className="text-indigo-200 text-sm font-medium uppercase tracking-wider">Projects</div>
                            </div>
                            <div className="w-px h-16 bg-indigo-500/50" />
                            <div className="space-y-1">
                                <div className="text-4xl md:text-5xl font-bold tracking-tight">{counts?.achievements || 0}</div>
                                <div className="text-indigo-200 text-sm font-medium uppercase tracking-wider">Awards</div>
                            </div>
                            <div className="w-px h-16 bg-indigo-500/50" />
                            <div className="space-y-1">
                                <div className="text-4xl md:text-5xl font-bold tracking-tight">{counts?.certifications || 0}</div>
                                <div className="text-indigo-200 text-sm font-medium uppercase tracking-wider">Certs</div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </section>
    )
}
