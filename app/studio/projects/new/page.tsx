import { ProjectForm } from "@/components/admin/ProjectForm"

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">New Project</h2>
            <ProjectForm />
        </div>
    )
}
