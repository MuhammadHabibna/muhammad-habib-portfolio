"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    Home,
    User,
    Briefcase,
    FolderOpen,
    Mail,
    Globe,
    Trophy,
    GraduationCap,
    Menu,
    X,
    Sun,
    Moon,
} from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

const navLinks = [
    { name: "Home",           href: "#home",          icon: Home },
    { name: "About",          href: "#about",         icon: User },
    { name: "Projects",       href: "#projects",      icon: FolderOpen },
    { name: "Achievements",   href: "#achievements",  icon: Trophy },
    { name: "Experience",     href: "#experience",    icon: Briefcase },
    { name: "Certifications", href: "#certifications",icon: GraduationCap },
    { name: "Contact",        href: "#contact",       icon: Mail },
]

export function Navbar() {
    const { scrollY } = useScroll()
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [mobileOpen, setMobileOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 30)
    })

    // Track active section via IntersectionObserver
    useEffect(() => {
        const sectionIds = ["home", "about", "projects", "achievements", "experience", "certifications", "contact"]
        const observers: IntersectionObserver[] = []

        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id)
                },
                { rootMargin: "-40% 0px -55% 0px" }
            )
            observer.observe(el)
            observers.push(observer)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [])

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        setMobileOpen(false)
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <>
            {/* ─── Desktop Floating Pill Navbar ─────────────────────────── */}
            <motion.header
                className="fixed top-4 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            >
                <div
                    className={cn(
                        "pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-300",
                        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
                        "border border-slate-200/60 dark:border-slate-700/60",
                        isScrolled
                            ? "shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                            : "shadow-[0_2px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.2)]"
                    )}
                >
                    {/* Logo */}
                    <a
                        href="#about"
                        onClick={(e) => handleScrollTo(e, "#about")}
                        className="flex items-center gap-0.5 px-3 py-1 mr-1 select-none"
                    >
                        <span className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                            MH
                        </span>
                        <span className="text-xl font-black text-indigo-500 leading-none mb-0.5">.</span>
                    </a>

                    {/* Divider */}
                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

                    {/* Nav Items */}
                    {navLinks.map((link) => {
                        const Icon = link.icon
                        const sectionId = link.href.replace("#", "")
                        const isActive = activeSection === sectionId

                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href)}
                                className={cn(
                                    "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 select-none",
                                    isActive
                                        ? "bg-indigo-500 text-white shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/70"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "w-3.5 h-3.5 flex-shrink-0",
                                        isActive ? "text-white" : ""
                                    )}
                                />
                                <span>{link.name}</span>
                            </a>
                        )
                    })}

                    {/* Divider */}
                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

                    {/* EN/ID Language Button (decorative) */}
                    <button
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                            "border border-slate-200 dark:border-slate-700",
                            "text-slate-600 dark:text-slate-300",
                            "hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200",
                            "cursor-default select-none"
                        )}
                        tabIndex={-1}
                        aria-hidden="true"
                    >
                        <Globe className="w-3.5 h-3.5" />
                        <span>EN</span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full ml-0.5",
                            "text-slate-500 dark:text-slate-400",
                            "hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                        )}
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </button>
                </div>
            </motion.header>

            {/* ─── Mobile Navbar ─────────────────────────────────────────── */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 md:hidden"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div
                    className={cn(
                        "flex items-center justify-between px-4 h-14 transition-all duration-300",
                        "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl",
                        "border-b border-slate-200/60 dark:border-slate-800/60",
                        isScrolled ? "shadow-sm" : ""
                    )}
                >
                    {/* Logo */}
                    <a
                        href="#about"
                        onClick={(e) => handleScrollTo(e, "#about")}
                        className="flex items-center gap-0.5 select-none"
                    >
                        <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100">MH</span>
                        <span className="text-xl font-black text-indigo-500">.</span>
                    </a>

                    <div className="flex items-center gap-2">
                        {/* EN Badge */}
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 dark:text-slate-400">
                            <Globe className="w-3 h-3" /> EN
                        </span>
                        {/* Theme */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </button>
                        {/* Hamburger */}
                        <button
                            onClick={() => setMobileOpen((v) => !v)}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="mx-3 mt-1 rounded-2xl overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg"
                        >
                            <div className="p-2 flex flex-col gap-0.5">
                                {navLinks.map((link) => {
                                    const Icon = link.icon
                                    const sectionId = link.href.replace("#", "")
                                    const isActive = activeSection === sectionId
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={(e) => handleScrollTo(e, link.href)}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                                                isActive
                                                    ? "bg-indigo-500 text-white"
                                                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                                            )}
                                        >
                                            <Icon className="w-4 h-4 flex-shrink-0" />
                                            {link.name}
                                        </a>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    )
}
