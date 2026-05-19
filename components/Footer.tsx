"use client"

import { motion } from "framer-motion"
import { ArrowUp, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const TECH_STACK = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion",
    "Vercel", "Node.js", "Python", "PostgreSQL", "Docker", "Git",
]

const FOOTER_LINKS = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
]

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="relative bg-slate-900 dark:bg-slate-950 text-white overflow-hidden">
            {/* Tech marquee strip */}
            <div className="border-b border-white/10 py-4 overflow-hidden">
                <motion.div
                    animate={{ x: [0, -1200] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex gap-8 whitespace-nowrap"
                >
                    {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                        <span key={i} className="text-sm font-mono text-white/40 uppercase tracking-widest">
                            {tech} <span className="text-sky-500/40 mx-4">•</span>
                        </span>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
                            Portfolio
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            Crafting digital experiences with modern web technologies. Always learning, always building.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-white/60 hover:text-white hover:bg-white/10" asChild>
                                <a href="https://github.com" target="_blank" rel="noopener"><Github className="w-4 h-4" /></a>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-white/60 hover:text-white hover:bg-white/10" asChild>
                                <a href="https://linkedin.com" target="_blank" rel="noopener"><Linkedin className="w-4 h-4" /></a>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 text-white/60 hover:text-white hover:bg-white/10" asChild>
                                <a href="mailto:contact@example.com"><Mail className="w-4 h-4" /></a>
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Quick Links</h4>
                        <nav className="flex flex-col gap-2.5">
                            {FOOTER_LINKS.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-white/50 hover:text-sky-400 transition-colors inline-flex items-center gap-1.5 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-px bg-sky-400 transition-all duration-200" />
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Built With</h4>
                        <div className="flex flex-wrap gap-2">
                            {TECH_STACK.slice(0, 8).map(tech => (
                                <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full border border-white/10 text-white/50 hover:text-sky-400 hover:border-sky-400/30 transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/30">
                        &copy; {new Date().getFullYear()} Portfolio. Built with Next.js, Tailwind & Supabase.
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={scrollToTop}
                        className="text-white/40 hover:text-white hover:bg-white/10 gap-2"
                    >
                        Back to top <ArrowUp className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </footer>
    )
}
