"use client"

import { motion } from "framer-motion"
import { type Skill } from "@/types"
import { Badge } from "@/components/ui/badge"

interface SkillsProps {
    skills: Skill[]
}

export function Skills({ skills }: SkillsProps) {
    // Group skills by category
    const categories = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = []
        }
        acc[skill.category].push(skill)
        return acc
    }, {} as Record<string, Skill[]>)

    return (
        <section id="skills" className="py-20 relative">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-600">
                        Skills & Expertise
                    </h2>
                    <div className="w-20 h-1.5 bg-indigo-500 rounded-full mt-2" />
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.12 } },
                    }}
                >
                    {Object.entries(categories).map(([category, items]) => (
                        <motion.div
                            key={category}
                            variants={{
                                hidden: { opacity: 0, y: 24 },
                                show: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            whileHover={{ y: -4 }}
                            className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md hover:shadow-teal-500/10 transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-indigo-700 dark:text-indigo-400 border-b pb-2 border-slate-200 dark:border-slate-700">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {items.sort((a, b) => (b.level || 0) - (a.level || 0)).map((skill) => (
                                    <motion.div
                                        key={skill.id}
                                        className="relative group cursor-default"
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    >
                                        <Badge variant="secondary" className="px-3 py-1 text-sm bg-white hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border-slate-200 dark:border-slate-700">
                                            {skill.skill_name}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
