"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Pencil, Trash } from "lucide-react"
import { type Project } from "@/types"

export default function ProjectsAdminPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setProjects(data)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return

        const { error } = await supabase.from('projects').delete().eq('id', id)
        if (!error) {
            fetchProjects()
        } else {
            alert("Error deleting project")
        }
    }

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Projects</h2>
                <Button asChild>
                    <Link href="/studio/projects/new"><Plus className="mr-2 h-4 w-4" /> Add Project</Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {projects.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg">
                        No projects found. Create one to get started.
                    </div>
                ) : (
                    projects.map((project) => (
                        <Card key={project.id} className="flex flex-row items-center p-4 justify-between">
                            <div className="flex items-center gap-4">
                                {project.thumbnail_image && (
                                    <img src={project.thumbnail_image} className="w-16 h-16 object-cover rounded-md" />
                                )}
                                <div>
                                    <h3 className="font-semibold text-lg">{project.title}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <Badge variant="outline">{project.type}</Badge>
                                        <Badge className={project.status === "PUBLISHED" ? "bg-green-500" : "bg-yellow-500"}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/studio/projects/${project.id}`}><Pencil className="h-4 w-4" /></Link>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(project.id)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
