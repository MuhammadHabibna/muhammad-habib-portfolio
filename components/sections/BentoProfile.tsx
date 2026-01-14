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
}

export function BentoProfile({ profile, socials }: BentoProfileProps) {
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
        <section className="py-24 container px-4 md:px-6">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
                {/* 1. Main Profile Card (Left Column - Spans 2 rows on desktop if needed, or just full height) */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-2">
                    <Card className="h-full border-none shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-8 flex flex-col items-center text-center h-full justify-center space-y-6 relative z-10">
                            <div className="relative">
                                <div className="w-40 h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden">
                                    <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900" title="Available for work" />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                                    {fullName}
                                </h1>
                                <p className="text-sky-600 font-medium text-lg">{headline}</p>
                                <div className="flex items-center justify-center text-muted-foreground text-sm gap-1">
                                    <MapPin className="w-4 h-4" /> {location}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {socials?.map(s => (
                                    <Button key={s.id} variant="ghost" size="icon" className="rounded-full hover:bg-sky-100 dark:hover:bg-sky-900/20 hover:text-sky-600" asChild>
                                        <a href={s.url} target="_blank" rel="noopener">
                                            {/* Icon mapping would be ideal here, using a generic one for now if unknown */}
                                            <ExternalLink className="w-5 h-5" />
                                            <span className="sr-only">{s.platform}</span>
                                        </a>
                                    </Button>
                                ))}
                                {!socials?.length && (
                                    <>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Github className="w-5 h-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Linkedin className="w-5 h-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Mail className="w-5 h-5" />
                                        </Button>
                                    </>
                                )}
                            </div>

                            <div className="pt-4 w-full grid gap-3">
                                <Button className="w-full rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 border-none shadow-lg shadow-sky-500/20">
                                    Contact Me
                                </Button>
                                {cvUrl && (
                                    <Button variant="outline" className="w-full rounded-full">
                                        <Download className="mr-2 h-4 w-4" /> Download CV
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 2. About Me Card (Top Right - Spans 2 cols) */}
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
                                {bioLong || "I specialize in building scalable web applications and intuitive user interfaces. With a focus on performance and accessibility, I aim to deliver products that make a difference."}
                            </p>

                            <div className="pt-4">
                                <h3 className="font-semibold mb-3">What I Do</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="px-3 py-1">Full Stack Development</Badge>
                                    <Badge variant="secondary" className="px-3 py-1">UI/UX Design</Badge>
                                    <Badge variant="secondary" className="px-3 py-1">Cloud Architecture</Badge>
                                    <Badge variant="secondary" className="px-3 py-1">AI Integration</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 3. Stats/Highlights Card (Bottom Right 1) */}
                <motion.div variants={item} className="md:col-span-1">
                    <Card className="h-full border-none shadow-lg bg-indigo-600 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-fullblur-3xl -mr-16 -mt-16 pointer-events-none" />
                        <CardContent className="p-6 flex flex-col justify-center h-full space-y-1">
                            <div className="text-5xl font-bold tracking-tight">3+</div>
                            <div className="text-indigo-100 font-medium">Years Experience</div>
                            <p className="text-indigo-200 text-sm mt-2">Constantly learning and evolving.</p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 4. Additional Info/Stack Card (Bottom Right 2) */}
                <motion.div variants={item} className="md:col-span-1">
                    <Card className="h-full border-none shadow-lg bg-slate-900 text-white dark:bg-slate-800">
                        <CardContent className="p-6 flex flex-col justify-center h-full">
                            <h3 className="text-xl font-bold text-sky-400 mb-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2 text-sm text-slate-300">
                                <span>Next.js</span> • <span>TypeScript</span> • <span>Tailwind</span> • <span>Supabase</span> • <span>Python</span> • <span>Framer Motion</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

            </motion.div>
        </section>
    )
}
