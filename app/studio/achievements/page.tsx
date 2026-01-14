"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Pencil, Trash, Trophy } from "lucide-react"

export default function AchievementsAdminPage() {
    const [achievements, setAchievements] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchAchievements()
    }, [])

    const fetchAchievements = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('achievements')
            .select('*')
            .order('year', { ascending: false })
            .order('created_at', { ascending: false })

        if (data) setAchievements(data)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return

        const { error } = await supabase.from('achievements').delete().eq('id', id)
        if (!error) {
            fetchAchievements()
        } else {
            alert("Error deleting achievement")
        }
    }

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Achievements</h2>
                <Button asChild>
                    <Link href="/studio/achievements/new"><Plus className="mr-2 h-4 w-4" /> Add Achievement</Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {achievements.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg">
                        No achievements found. Create one to get started.
                    </div>
                ) : (
                    achievements.map((item) => (
                        <Card key={item.id} className="flex flex-row items-center p-4 justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Trophy className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <Badge variant="outline">{item.year}</Badge>
                                        <Badge variant="secondary">{item.award}</Badge>
                                        <Badge className={item.status === "PUBLISHED" ? "bg-green-500" : "bg-yellow-500"}>
                                            {item.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/studio/achievements/${item.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
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
