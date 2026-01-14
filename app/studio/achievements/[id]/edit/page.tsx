"use client";

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import dynamic from 'next/dynamic'
import { Loader2 } from "lucide-react"

const AchievementForm = dynamic(() => import('@/components/admin/AchievementForm').then(mod => mod.AchievementForm), {
    ssr: false,
    loading: () => <p>Loading Form...</p>
})

export default function EditAchievementPage() {
    const params = useParams()
    const id = params.id as string
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .eq('id', id)
                .single()

            if (data) setData(data)
            setLoading(false)
        }
        fetchData()
    }, [id])

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
    if (!data) return <div>Achievement not found</div>

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Edit Achievement</h2>
            <AchievementForm initialData={data} />
        </div>
    )
}
