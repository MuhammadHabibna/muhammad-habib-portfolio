export const dynamic = "force-dynamic";
export const revalidate = 0;

import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ExperienceForm } from "@/components/admin/ExperienceForm"

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const { data: experience } = await supabase.from('organizations').select('*').eq('id', params.id).single()

    if (!experience) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Edit Experience</h2>
            <ExperienceForm initialData={experience} />
        </div>
    )
}
