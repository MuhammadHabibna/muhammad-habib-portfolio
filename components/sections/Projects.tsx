"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type Project } from "@/types"
import { DetailModal } from "@/components/DetailModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, ExternalLink, Github } from "lucide-react"

interface ProjectsProps {
    projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
    const [filter, setFilter] = useState("ALL") // ALL, PERSONAL, TEAM
    const [search, setSearch] = useState("")
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const filteredProjects = projects.filter((p) => {
        const matchesFilter = filter === "ALL" || p.type === filter
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.tech_stack?.some(t => t.toLowerCase().includes(search.toLowerCase()))
        return matchesFilter && matchesSearch
    })

    return (
        <section id="projects" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        A selection of my best work, ranging from web applications to AI models.
                    </p>
                    <div className="w-20 h-1.5 bg-sky-500 rounded-full mt-2" />
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 w-full max-w-5xl mx-auto">
                    <Tabs defaultValue="ALL" className="w-full md:w-auto" onValueChange={setFilter}>
                        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                            <TabsTrigger value="ALL">All Projects</TabsTrigger>
                            <TabsTrigger value="PERSONAL">Personal</TabsTrigger>
                            <TabsTrigger value="TEAM">Team</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
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
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-medium border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">View Details</span>
                                        </div>
                                    </div>

                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{project.title}</CardTitle>
                                            <Badge variant={project.type === "PERSONAL" ? "default" : "secondary"}>
                                                {project.type}
                                            </Badge>
                                        </div>
                                        <CardDescription className="line-clamp-2">{project.summary}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="flex-1">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech_stack?.slice(0, 3).map(tech => (
                                                <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                                            ))}
                                            {project.tech_stack && project.tech_stack.length > 3 && (
                                                <Badge variant="outline" className="text-xs">+{project.tech_stack.length - 3}</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

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
                        {/* Image Gallery carousel placeholder */}
                        {selectedProject.gallery_images && selectedProject.gallery_images.length > 0 && (
                            <div className="flex gap-4 overflow-x-auto pb-4">
                                {selectedProject.gallery_images.map((img, i) => (
                                    <img key={i} src={img} className="h-64 rounded-lg object-cover shadow-md" />
                                ))}
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tech_stack?.map(tech => (
                                    <Badge key={tech}>{tech}</Badge>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose dark:prose-invert max-w-none">
                            <p>{selectedProject.description}</p>
                        </div>

                        {/* Links */}
                        <div className="flex gap-4 pt-4 border-t">
                            {selectedProject.github_url && (
                                <Button variant="outline" asChild>
                                    <a href={selectedProject.github_url} target="_blank" rel="noopener"><Github className="mr-2 h-4 w-4" /> Source Code</a>
                                </Button>
                            )}
                            {selectedProject.demo_url && (
                                <Button asChild>
                                    <a href={selectedProject.demo_url} target="_blank" rel="noopener"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a>
                                </Button>
                            )}
                        </div>
                    </div>
                </DetailModal>
            )}
        </section>
    )
}
