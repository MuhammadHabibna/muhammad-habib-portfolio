"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, ChevronDown, ChevronUp, ExternalLink, Award } from "lucide-react"
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
        <section id="achievements" className="py-20 relative z-10">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
                        Achievements & Awards
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Milestones and recognition from my journey in tech.
                    </p>
                </motion.div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

                    <div className="space-y-8">
                        {achievements.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "relative flex flex-col md:flex-row gap-8 items-center md:items-start",
                                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                                )}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-amber-500 z-10 hidden md:flex items-center justify-center">
                                    <Trophy className="w-3 h-3 text-amber-500" />
                                </div>

                                {/* Content Card */}
                                <div className="w-full md:w-[calc(50%-2rem)]">
                                    <Card
                                        className={cn(
                                            "p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-400 overflow-hidden",
                                            expandedId === item.id ? "ring-2 ring-primary/20" : ""
                                        )}
                                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/10">
                                                        {item.year}
                                                    </Badge>
                                                    {item.level && <Badge variant="secondary" className="text-xs">{item.level}</Badge>}
                                                </div>
                                                <h3 className="font-bold text-lg leading-tight mb-1">{item.title}</h3>
                                                <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                                                    <Award className="w-3 h-3" /> {item.event}
                                                </p>
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
                                                    <div className="pt-4 border-t mt-4 text-sm text-muted-foreground leading-relaxed">
                                                        <p>{item.description}</p>
                                                        {item.proof_url && (
                                                            <div className="mt-4">
                                                                <Button size="sm" variant="outline" className="gap-2 w-full sm:w-auto" asChild>
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
