"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation" // Correct for Client Components in App Router
import { createClient } from "@/lib/supabase/client"
import { ProjectForm } from "@/components/admin/ProjectForm"
import { Loader2 } from "lucide-react"

export default function EditProjectPage() {
    const params = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchProject = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', params.id as string) // id is technically string | string[]
                .single()

            if (data) setProject(data)
            setLoading(false)
        }
        if (params.id) fetchProject()
    }, [params.id])

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
    if (!project) return <div>Project not found</div>

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Edit Project</h2>
            <ProjectForm initialData={project} />
        </div>
    )
}
