"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Project } from "@/types"
import { DetailModal } from "@/components/DetailModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ExternalLink, Github, ChevronDown, Calendar, Globe } from "lucide-react"

interface ProjectsProps {
    projects: Project[]
}

const PROJECT_TYPES = [
    "Klasifikasi Citra",
    "Object Detection",
    "Segmentasi Citra",
    "Object Character Recognition",
    "Clustering (Tabular)",
    "Klasifikasi (Tabular)",
    "Regresi (Tabular)",
    "Forecasting (Tabular)",
    "Analisis Sentiment",
    "Klasifikasi Teks"
]

export function Projects({ projects }: ProjectsProps) {
    const [scopeFilter, setScopeFilter] = useState("ALL") // ALL, PERSONAL, TEAM
    const [categoryFilter, setCategoryFilter] = useState("ALL") // Renamed from typeFilter
    const [search, setSearch] = useState("")
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [visibleCount, setVisibleCount] = useState(6)

    const filteredProjects = projects.filter((p) => {
        const matchesScope = scopeFilter === "ALL" || p.type === scopeFilter
        const matchesCategory = categoryFilter === "ALL" || (p.project_type && p.project_type === categoryFilter)

        const isMatch = matchesScope && matchesCategory &&
            (p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.tech_stack?.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
                p.project_type?.toLowerCase().includes(search.toLowerCase())
            )

        return isMatch
    })

    const visibleProjects = filteredProjects.slice(0, visibleCount)

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Present"
        try {
            return new Date(dateString).toLocaleDateString("id-ID", { month: 'short', year: 'numeric' })
        } catch (e) {
            return dateString
        }
    }

    return (
        <section id="projects" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Explore my portfolio of AI, Machine Learning, and Web Application projects.
                    </p>
                    <div className="w-20 h-1.5 bg-sky-500 rounded-full mt-2" />
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 w-full max-w-6xl mx-auto flex-wrap md:flex-nowrap">
                    {/* Scope Filter */}
                    <div className="w-full md:w-48 shrink-0">
                        <Select value={scopeFilter} onValueChange={setScopeFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Scope" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Scopes</SelectItem>
                                <SelectItem value="PERSONAL">Personal</SelectItem>
                                <SelectItem value="TEAM">Team</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Category Filter */}
                    <div className="w-full md:w-64 shrink-0">
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Categories</SelectItem>
                                {PROJECT_TYPES.map(t => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="relative w-full md:flex-1 min-w-[200px]">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects by title, tech, or category..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    <AnimatePresence>
                        {visibleProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card
                                    className="h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border-slate-200/60 dark:border-slate-800"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="aspect-video w-full bg-muted relative overflow-hidden group">
                                        {project.thumbnail_image ? (
                                            <img src={project.thumbnail_image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-sky-100 dark:bg-sky-900/20 text-sky-500">
                                                <span className="font-bold text-xl">No Image</span>
                                            </div>
                                        )}

                                        <div className="absolute top-2 left-2 flex gap-2">
                                            <Badge variant={project.type === 'PERSONAL' ? 'default' : 'secondary'} className="shadow-sm backdrop-blur-md bg-opacity-90">
                                                {project.type}
                                            </Badge>
                                        </div>

                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-medium border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">View Details</span>
                                        </div>
                                    </div>

                                    <CardHeader className="pb-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{project.title}</CardTitle>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                                {project.project_type && (
                                                    <Badge variant="outline" className="font-normal text-muted-foreground bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                                        {project.project_type}
                                                    </Badge>
                                                )}
                                                {(project.start_date || project.end_date) && (
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {formatDate(project.start_date)} - {project.end_date ? formatDate(project.end_date) : "Present"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <CardDescription className="line-clamp-2 mt-2 leading-snug">{project.summary}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="flex-1 mt-auto pt-0">
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {project.tech_stack?.slice(0, 3).map(tech => (
                                                <Badge key={tech} variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 pointer-events-none">{tech}</Badge>
                                            ))}
                                            {project.tech_stack && project.tech_stack.length > 3 && (
                                                <Badge variant="outline" className="text-xs pointer-events-none">+{project.tech_stack.length - 3}</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More */}
                {filteredProjects.length > visibleCount && (
                    <div className="flex justify-center mt-12">
                        <Button
                            variant="secondary"
                            size="lg"
                            className="rounded-full px-8"
                            onClick={() => setVisibleCount(prev => prev + 6)}
                        >
                            Show More <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No projects found matching your criteria.
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedProject && (
                <DetailModal
                    isOpen={!!selectedProject}
                    onOpenChange={(open) => !open && setSelectedProject(null)}
                    title={selectedProject.title}
                    description={selectedProject.role || "Creator"}
                >
                    <div className="space-y-6">
                        {/* Image Gallery setup - using thumbnail if no gallery */}
                        <div className="rounded-lg overflow-hidden shadow-md">
                            {selectedProject.gallery_images && selectedProject.gallery_images.length > 0 ? (
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {selectedProject.gallery_images.map((img, i) => (
                                        <img key={i} src={img} className="h-64 rounded-lg object-cover shadow-md min-w-[300px]" alt={`Gallery ${i}`} />
                                    ))}
                                </div>
                            ) : selectedProject.thumbnail_image ? (
                                <img src={selectedProject.thumbnail_image} alt={selectedProject.title} className="w-full max-h-[400px] object-cover" />
                            ) : null}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Badge className="text-sm px-3 py-1">{selectedProject.type}</Badge>
                            {selectedProject.project_type && (
                                <Badge variant="outline" className="text-sm px-3 py-1 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                    {selectedProject.project_type}
                                </Badge>
                            )}
                            <span className="text-muted-foreground text-sm flex items-center gap-1 border-l pl-3 border-slate-200 dark:border-slate-700">
                                <Calendar className="h-4 w-4" />
                                {formatDate(selectedProject.start_date)} - {selectedProject.end_date ? formatDate(selectedProject.end_date) : "Present"}
                            </span>
                            <span className="text-muted-foreground text-sm flex items-center gap-1 border-l pl-3 border-slate-200 dark:border-slate-700">
                                {selectedProject.status === "PUBLISHED" ? <span className="flex items-center gap-1 text-green-600 dark:text-green-400">● Live</span> : "Draft"}
                            </span>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground/80">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tech_stack?.map(tech => (
                                    <Badge key={tech} variant="secondary" className="px-3 py-1">{tech}</Badge>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                            <p className="whitespace-pre-line leading-relaxed">{selectedProject.description}</p>
                        </div>

                        {/* Highlights */}
                        {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                                <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground/80">Key Highlights</h3>
                                <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                                    {selectedProject.highlights.map((h, i) => (
                                        <li key={i}>{h}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-wrap gap-4 pt-6 border-t mt-4">
                            {selectedProject.github_url && (
                                <Button variant="outline" asChild className="gap-2">
                                    <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-4 w-4" /> Source Code
                                    </a>
                                </Button>
                            )}
                            {selectedProject.demo_url && (
                                <Button asChild className="gap-2 bg-sky-600 hover:bg-sky-700 text-white">
                                    <a href={selectedProject.demo_url} target="_blank" rel="noopener noreferrer">
                                        <Globe className="h-4 w-4" /> Live Demo
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </DetailModal>
            )}
        </section>
    )
}
