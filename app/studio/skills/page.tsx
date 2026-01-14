export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Brain } from "lucide-react"

export default async function SkillsPage() {
    const supabase = await createClient()
    const { data: skills } = await supabase.from("skills").select("*").order("level", { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
                    <p className="text-muted-foreground">Manage your technical skills and proficiency</p>
                </div>
                <Link href="/studio/skills/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {skills?.map((skill) => (
                    <div key={skill.id} className="flex flex-col justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400`}>
                                    {skill.category}
                                </span>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${skill.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                    {skill.status === 'PUBLISHED' ? 'Pub' : 'Draft'}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg">{skill.skill_name}</h3>
                            <div className="mt-2 text-xs text-muted-foreground">Proficiency: {skill.level}%</div>
                            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mt-1">
                                <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-end">
                            <Link href={`/studio/skills/${skill.id}`} className="w-full">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Pencil className="mr-2 h-3 w-3" /> Edit
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}

                {skills?.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-slate-50 dark:bg-slate-900/50">
                        <Brain className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="font-semibold text-lg">No skills added</h3>
                        <p className="text-muted-foreground text-sm mb-4">Add your technical expertise.</p>
                        <Link href="/studio/skills/new">
                            <Button>Add Skill</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
