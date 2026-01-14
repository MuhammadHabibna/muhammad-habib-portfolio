export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Award } from "lucide-react"

export default async function CertificationsPage() {
    const supabase = await createClient()
    const { data: certifications } = await supabase.from("certifications").select("*").order("issue_date", { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
                    <p className="text-muted-foreground">Manage your licenses and certifications</p>
                </div>
                <Link href="/studio/certifications/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {certifications?.map((cert) => (
                    <div key={cert.id} className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-6 flex flex-col flex-1">
                            {cert.certificate_image && (
                                <div className="mb-4 aspect-video w-full rounded-md overflow-hidden border bg-muted">
                                    <img src={cert.certificate_image} alt={cert.name} className="h-full w-full object-cover" />
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${cert.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                    {cert.status}
                                </span>
                                {cert.issue_date && (
                                    <span className="text-xs text-muted-foreground">{new Date(cert.issue_date).getFullYear()}</span>
                                )}
                            </div>
                            <h3 className="mt-2 font-semibold leading-none tracking-tight line-clamp-2">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                        </div>
                        <div className="flex items-center p-6 pt-0 gap-2">
                            <Link href={`/studio/certifications/${cert.id}`} className="w-full">
                                <Button variant="outline" className="w-full">
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}

                {certifications?.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-slate-50 dark:bg-slate-900/50">
                        <Award className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="font-semibold text-lg">No certifications yet</h3>
                        <p className="text-muted-foreground text-sm mb-4">Start showcasing your achievements.</p>
                        <Link href="/studio/certifications/new">
                            <Button>Add Certification</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
