export const dynamic = "force-dynamic";
export const revalidate = 0;

import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { SkillForm } from "@/components/admin/SkillForm"

export default async function EditSkillPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const { data: skill } = await supabase.from('skills').select('*').eq('id', params.id).single()

    if (!skill) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Edit Skill</h2>
            <SkillForm initialData={skill} />
        </div>
    )
}
