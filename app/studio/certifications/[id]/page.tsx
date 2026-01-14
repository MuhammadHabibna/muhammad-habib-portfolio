export const dynamic = "force-dynamic";
export const revalidate = 0;

import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { CertificationForm } from "@/components/admin/CertificationForm"

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: certification } = await supabase.from('certifications').select('*').eq('id', id).single()

    if (!certification) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Edit Certification</h2>
            <CertificationForm initialData={certification} />
        </div>
    )
}
