"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, ExternalLink, Award, Calendar, Eye, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { type Achievement } from "@/types"

interface AchievementsProps {
    achievements: Achievement[]
}

export function Achievements({ achievements }: AchievementsProps) {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

    if (achievements.length === 0) return null

    return (
        <section id="achievements" className="py-24 relative z-10">
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
                    <div className="absolute left-8 md:left-[120px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800" />

                    <div className="space-y-6">
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
                                </div>

                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-[120px] -translate-x-1/2 w-4 h-4 rounded-full bg-background border-4 border-amber-500 z-10 mt-3.5 group cursor-pointer" onClick={() => setSelectedAchievement(item)}>
                                    <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-75 hidden group-hover:block" />
                                </div>

                                {/* Content Card (Right) */}
                                <div className="pl-16 md:pl-0 w-full">
                                    <Card
                                        className="cursor-pointer hover:shadow-md transition-all duration-300 overflow-hidden border-none bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm group"
                                        onClick={() => setSelectedAchievement(item)}
                                    >
                                        <div className="p-4 flex items-center justify-between gap-4">
                                            <div className="space-y-1 min-w-0">
                                                {/* Mobile Year */}
                                                <div className="md:hidden flex items-center gap-2 mb-1 text-amber-500 font-bold">
                                                    <span>{item.year}</span>
                                                </div>

                                                <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-slate-100 line-clamp-1">{item.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground line-clamp-1">
                                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                                        {item.event}
                                                    </span>
                                                    {item.level && (
                                                        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                            {item.level}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground group-hover:text-amber-500 transition-colors">
                                                <Eye className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <Dialog open={!!selectedAchievement} onOpenChange={(open) => !open && setSelectedAchievement(null)}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
                    {selectedAchievement && (
                        <div className="flex flex-col relative">
                            {/* Header / Image Area */}
                            <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                                {selectedAchievement.proof_image_url ? (
                                    <img
                                        src={selectedAchievement.proof_image_url}
                                        alt={selectedAchievement.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                                        <Trophy className="w-16 h-16" />
                                        <span className="text-sm">No Proof Image</span>
                                    </div>
                                )}

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                                    onClick={() => setSelectedAchievement(null)}
                                >
                                    <X className="w-5 h-5" />
                                </Button>

                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex gap-2">
                                        {selectedAchievement.award && (
                                            <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-lg">
                                                <Trophy className="w-3 h-3 mr-1" /> {selectedAchievement.award}
                                            </Badge>
                                        )}
                                        {selectedAchievement.level && (
                                            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-white/20">
                                                {selectedAchievement.level}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-amber-500 flex items-center gap-1">
                                            <Calendar className="w-4 h-4" /> {selectedAchievement.year}
                                        </span>
                                        {selectedAchievement.date && (
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(selectedAchievement.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-bold leading-tight mb-2">{selectedAchievement.title}</h2>
                                    <p className="text-lg font-medium text-muted-foreground">{selectedAchievement.event}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                                        <p>{selectedAchievement.description}</p>
                                    </div>

                                    {selectedAchievement.proof_image_caption && (
                                        <p className="text-xs text-muted-foreground italic border-l-2 border-amber-500 pl-3">
                                            {selectedAchievement.proof_image_caption}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 flex gap-3">
                                    {selectedAchievement.proof_url && (
                                        <Button className="flex-1" asChild>
                                            <a href={selectedAchievement.proof_url} target="_blank" rel="noopener noreferrer">
                                                View Live Proof <ExternalLink className="ml-2 w-4 h-4" />
                                            </a>
                                        </Button>
                                    )}
                                    {selectedAchievement.proof_image_url && (
                                        <Button variant="outline" className="flex-1" asChild>
                                            <a href={selectedAchievement.proof_image_url} target="_blank" rel="noopener noreferrer">
                                                Open Image <ExternalLink className="ml-2 w-4 h-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}
