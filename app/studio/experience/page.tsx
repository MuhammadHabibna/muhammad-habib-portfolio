export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Building2, Calendar } from "lucide-react"

export default async function ExperiencePage() {
    const supabase = await createClient()
    const { data: experiences } = await supabase.from("organizations").select("*").order("start_date", { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
                    <p className="text-muted-foreground">Manage your work history and organizations</p>
                </div>
                <Link href="/studio/experience/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {experiences?.map((exp) => (
                    <div key={exp.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{exp.role_title}</h3>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${exp.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                    {exp.status}
                                </span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Building2 className="mr-1 h-4 w-4" />
                                {exp.org_name}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Calendar className="mr-1 h-3 w-3" />
                                {exp.start_date ? new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'} - {exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href={`/studio/experience/${exp.id}`}>
                                <Button variant="outline" size="sm">
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}

                {experiences?.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-slate-50 dark:bg-slate-900/50">
                        <Building2 className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="font-semibold text-lg">No experience yet</h3>
                        <p className="text-muted-foreground text-sm mb-4">Add your professional journey.</p>
                        <Link href="/studio/experience/new">
                            <Button>Add Experience</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
