"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { type Project } from "@/types"
import { DetailModal } from "@/components/DetailModal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Globe, ArrowUpRight, Calendar } from "lucide-react"

interface FeaturedWorksProps {
    projects: Project[]
}

function formatDate(d: string | null) {
    if (!d) return "Present"
    try { return new Date(d).toLocaleDateString("id-ID", { month: "short", year: "numeric" }) }
    catch { return d }
}

function FeaturedRow({
    project,
    index,
    onOpen,
}: {
    project: Project
    index: number
    onOpen: (p: Project) => void
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const imgX = useTransform(scrollYProgress, [0, 1], [30, -30])

    const num = String(index + 1).padStart(2, "0")

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
            onClick={() => onOpen(project)}
            className="
                group relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16
                py-10 border-b border-slate-200 dark:border-slate-800
                cursor-pointer
            "
        >
            {/* Number */}
            <span className="
                text-[5rem] lg:text-[7rem] font-extrabold leading-none
                text-slate-100 dark:text-slate-800
                group-hover:text-indigo-100 dark:group-hover:text-indigo-950
                transition-colors duration-300 select-none flex-shrink-0 w-28 lg:w-36
            ">
                {num}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-3">
                {/* Category badges */}
                <div className="flex flex-wrap gap-2">
                    {project.project_category?.slice(0, 2).map(cat => (
                        <Badge
                            key={cat}
                            variant="outline"
                            className="text-[11px] font-mono border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
                        >
                            {cat}
                        </Badge>
                    ))}
                    {project.start_date && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar className="h-3 w-3" />
                            {formatDate(project.start_date)} — {formatDate(project.end_date)}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="
                    text-2xl lg:text-3xl font-extrabold tracking-tight
                    text-slate-900 dark:text-white
                    group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                    transition-colors duration-200
                ">
                    {project.title}
                    <ArrowUpRight className="inline-block ml-2 h-6 w-6 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-200" />
                </h3>

                {/* Summary */}
                <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl line-clamp-2">
                    {project.summary}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                    {project.tech_stack?.slice(0, 5).map(tech => (
                        <Badge key={tech} variant="secondary" className="text-[11px] font-mono bg-slate-100 dark:bg-slate-800">
                            {tech}
                        </Badge>
                    ))}
                    {(project.tech_stack?.length ?? 0) > 5 && (
                        <Badge variant="outline" className="text-[11px] font-mono">+{project.tech_stack!.length - 5}</Badge>
                    )}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2" onClick={e => e.stopPropagation()}>
                    {project.github_url && (
                        <Button size="sm" variant="outline" className="rounded-full h-8 px-4 text-xs gap-1.5" asChild>
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                <Github className="h-3.5 w-3.5" /> Code
                            </a>
                        </Button>
                    )}
                    {project.demo_url && (
                        <Button size="sm" className="rounded-full h-8 px-4 text-xs gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                <Globe className="h-3.5 w-3.5" /> Live Demo
                            </a>
                        </Button>
                    )}
                </div>
            </div>

            {/* Thumbnail — parallax */}
            {project.thumbnail_image && (
                <motion.div
                    style={{ x: imgX }}
                    className="
                        hidden lg:block w-52 xl:w-64 aspect-video rounded-2xl overflow-hidden
                        shadow-lg flex-shrink-0
                        group-hover:shadow-indigo-500/20 group-hover:shadow-2xl
                        transition-shadow duration-300
                    "
                >
                    <img
                        src={project.thumbnail_image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>
            )}
        </motion.div>
    )
}

export function FeaturedWorks({ projects }: FeaturedWorksProps) {
    const [selected, setSelected] = useState<Project | null>(null)

    // Filter + sort pinned only
    const featured = projects
        .filter(p => p.is_pinned && p.status === "PUBLISHED")
        .sort((a, b) => (a.featured_order ?? 99) - (b.featured_order ?? 99))

    if (featured.length === 0) return null

    const formatDate = (d: string | null) => {
        if (!d) return "Present"
        try { return new Date(d).toLocaleDateString("id-ID", { month: "short", year: "numeric" }) }
        catch { return d }
    }

    return (
        <section id="featured-works" className="relative py-24 bg-white dark:bg-slate-950">
            <div className="max-w-6xl mx-auto px-8 lg:px-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <p className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-500 dark:text-indigo-400 mb-3">
                        Selected Works
                    </p>
                    <div className="flex items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Featured Works
                        </h2>
                        <a
                            href="#projects"
                            className="text-sm font-semibold text-slate-400 hover:text-indigo-500 transition-colors flex items-center gap-1 whitespace-nowrap pb-1"
                        >
                            All Projects <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </motion.div>

                {/* Rows */}
                <div>
                    {featured.map((project, i) => (
                        <FeaturedRow
                            key={project.id}
                            project={project}
                            index={i}
                            onOpen={setSelected}
                        />
                    ))}
                </div>
            </div>

            {/* Detail Modal */}
            {selected && (
                <DetailModal
                    isOpen={!!selected}
                    onOpenChange={(open) => !open && setSelected(null)}
                    title={selected.title}
                    description={selected.role || "Creator"}
                >
                    <div className="space-y-6">
                        <div className="rounded-lg overflow-hidden shadow-md">
                            {selected.gallery_images && selected.gallery_images.length > 0 ? (
                                <div className="flex gap-4 overflow-x-auto pb-4">
                                    {selected.gallery_images.map((img, i) => (
                                        <img key={i} src={img} className="h-64 rounded-lg object-cover shadow-md min-w-[300px]" alt={`Gallery ${i}`} />
                                    ))}
                                </div>
                            ) : selected.thumbnail_image ? (
                                <img src={selected.thumbnail_image} alt={selected.title} className="w-full max-h-[400px] object-cover" />
                            ) : null}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Badge>{selected.type}</Badge>
                            {selected.project_category?.map(c => (
                                <Badge key={c} variant="outline">{c}</Badge>
                            ))}
                        </div>
                        {selected.tech_stack && (
                            <div>
                                <h3 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selected.tech_stack.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                                </div>
                            </div>
                        )}
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{selected.description}</p>
                        {selected.highlights && selected.highlights.length > 0 && (
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                {selected.highlights.map((h, i) => <li key={i}>{h}</li>)}
                            </ul>
                        )}
                        <div className="flex gap-3 pt-4 border-t">
                            {selected.github_url && (
                                <Button variant="outline" asChild><a href={selected.github_url} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" />Code</a></Button>
                            )}
                            {selected.demo_url && (
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" asChild><a href={selected.demo_url} target="_blank" rel="noopener noreferrer"><Globe className="mr-2 h-4 w-4" />Live Demo</a></Button>
                            )}
                        </div>
                    </div>
                </DetailModal>
            )}
        </section>
    )
}
