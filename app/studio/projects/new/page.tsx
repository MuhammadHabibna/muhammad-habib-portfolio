"use client";

import dynamic from 'next/dynamic'

const ProjectForm = dynamic(() => import('@/components/admin/ProjectForm').then(mod => mod.ProjectForm), {
    ssr: false,
    loading: () => <p>Loading Form...</p>
})

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">New Project</h2>
            <ProjectForm />
        </div>
    )
}
