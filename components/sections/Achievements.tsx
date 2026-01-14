"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, ChevronDown, ChevronUp, ExternalLink, Award, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { type Achievement } from "@/types"

interface AchievementsProps {
    achievements: Achievement[]
}

export function Achievements({ achievements }: AchievementsProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    if (achievements.length === 0) return null

    return (
        <section id="achievements" className="py-24 relative z-10">
            {/* Background Decoration specific to this section if needed, though global bg is present */}
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
                        Achievements & Competitions
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Milestones and recognition from my journey.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line - Left aligned on mobile, Center-ish on desktop? 
                        User asked for: Year (Left) - Dot (Center line?) - Content (Right).
                        Let's do a structured grid.
                    */}
                    <div className="absolute left-8 md:left-[120px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800" />

                    <div className="space-y-12">
                        {achievements.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative flex flex-col md:flex-row gap-8"
                            >
                                {/* Year Badge (Left) */}
                                <div className="hidden md:flex flex-col items-end w-[100px] shrink-0 pt-2">
                                    <span className="text-2xl font-bold text-amber-500">{item.year}</span>
                                    {item.date && (
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(item.date).toLocaleDateString(undefined, { month: 'short' })}
                                        </span>
                                    )}
                                </div>

                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-[120px] -translate-x-1/2 w-4 h-4 rounded-full bg-background border-4 border-amber-500 z-10 mt-3.5 group">
                                    <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-75 hidden group-hover:block" />
                                </div>

                                {/* Content Card (Right) */}
                                <div className="pl-16 md:pl-0 w-full">
                                    <Card
                                        className={cn(
                                            "cursor-pointer hover:shadow-md transition-all duration-300 overflow-hidden border-none bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm",
                                            expandedId === item.id ? "ring-1 ring-amber-500/50" : ""
                                        )}
                                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                    >
                                        <div className="p-6">
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="space-y-1">
                                                    {/* Mobile Year */}
                                                    <div className="md:hidden flex items-center gap-2 mb-2 text-amber-500 font-bold">
                                                        <span>{item.year}</span>
                                                        {item.date && <span className="text-xs font-normal text-muted-foreground">• {new Date(item.date).toLocaleDateString(undefined, { month: 'short' })}</span>}
                                                    </div>

                                                    <h3 className="font-bold text-xl leading-tight text-slate-900 dark:text-slate-100">{item.title}</h3>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                                                            <Award className="w-4 h-4 text-amber-500" /> {item.event}
                                                        </span>
                                                        {item.level && (
                                                            <Badge variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800">
                                                                {item.level}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 text-muted-foreground">
                                                    {expandedId === item.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                </Button>
                                            </div>

                                            <AnimatePresence>
                                                {expandedId === item.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 text-muted-foreground leading-relaxed">
                                                            <p>{item.description}</p>
                                                            {item.proof_url && (
                                                                <div className="mt-4">
                                                                    <Button size="sm" variant="outline" className="gap-2 group-hover:border-amber-500 group-hover:text-amber-600 transition-colors" asChild>
                                                                        <a href={item.proof_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                                                            View Proof <ExternalLink className="w-3 h-3" />
                                                                        </a>
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
