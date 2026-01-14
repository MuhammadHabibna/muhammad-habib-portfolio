"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { type Profile, type SocialLink } from "@/types"

interface HeroProps {
    profile?: Profile | null
    socials?: SocialLink[]
}

export function Hero({ profile, socials }: HeroProps) {
    // Fallback data if DB is empty
    const fullName = profile?.full_name || "Portfolio Owner"
    const headline = profile?.headline || "Full Stack Engineer | UI/UX Enthusiast"
    const bio = profile?.bio_short || "I build accessible, pixel-perfect, and performant web experiences."
    const avatarUrl = profile?.profile_photo || "https://ui.shadcn.com/avatars/01.png"
    const bannerUrl = profile?.banner_image || null

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
            {/* Background Elements - Optional vector blobs can go here if CSS based */}

            <div className="container px-4 md:px-6 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6"
                >
                    {/* Profile Photo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="relative"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/50 shadow-xl overflow-hidden bg-muted">
                            {/* Use Next Image in real app, standard img for simplicity here */}
                            <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                        </div>
                        {/* Status Badge (Optional) */}
                        <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-white" title="Open to work" />
                    </motion.div>

                    {/* Texts */}
                    <div className="space-y-2">
                        <motion.h1
                            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {fullName}
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-2xl text-sky-600 font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {headline}
                        </motion.p>
                    </div>

                    <motion.p
                        className="text-muted-foreground text-base md:text-lg max-w-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {bio}
                    </motion.p>

                    {/* Buttons & Socials */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 pt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all shadow-sky-500/20 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 border-none">
                            Contact Me
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full bg-white/50 backdrop-blur-sm border-white/40 hover:bg-white/80">
                            View Projects
                        </Button>
                    </motion.div>

                    {/* Social Icons (Dynamic or Static) */}
                    <motion.div
                        className="flex items-center gap-4 pt-4 text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {socials ? socials.map(s => (
                            <a key={s.id} href={s.url} target="_blank" rel="noopener" className="hover:text-sky-600 hover:scale-110 transition-transform">
                                {/* Map platform to icon, logic needed. Simplified for now. */}
                                <span className="capitalize">{s.platform}</span>
                            </a>
                        )) : (
                            <>
                                <a href="#" className="hover:text-primary transition-colors"><Github className="w-6 h-6" /></a>
                                <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
                                <a href="mailto:contact@example.com" className="hover:text-primary transition-colors"><Mail className="w-6 h-6" /></a>
                            </>
                        )}
                    </motion.div>

                </motion.div>
            </div>
        </section>
    )
}
