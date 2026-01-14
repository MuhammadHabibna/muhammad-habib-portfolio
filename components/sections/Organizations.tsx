"use client"

import { useState } from "react"
import { type Organization } from "@/types"
import { DetailModal } from "@/components/DetailModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Building2, Calendar } from "lucide-react"

interface OrganizationsProps {
    organizations: Organization[]
}

export function Organizations({ organizations }: OrganizationsProps) {
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)

    return (
        <section id="experience" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                        Working Experience
                    </h2>
                    <div className="w-20 h-1.5 bg-sky-500 rounded-full mt-2" />
                </div>

                <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {organizations.map((org, i) => (
                        <div key={org.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            {/* Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-sky-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-auto md:mx-0 absolute left-0 md:left-1/2 -translate-x-1 md:translate-x-0">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>

                            {/* Card */}
                            <div
                                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 cursor-pointer ml-14 md:ml-0"
                                onClick={() => setSelectedOrg(org)}
                            >
                                <div className="flex flex-col space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100">{org.role_title}</h3>
                                            <p className="text-sky-600 font-medium">{org.org_name}</p>
                                        </div>
                                        {org.logo && <img src={org.logo} alt={org.org_name} className="w-10 h-10 object-contain rounded-md bg-white p-1 shadow-sm" />}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {org.start_date} - {org.end_date || "Present"}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {org.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedOrg && (
                <DetailModal
                    isOpen={!!selectedOrg}
                    onOpenChange={(open) => !open && setSelectedOrg(null)}
                    title={selectedOrg.role_title}
                    description={selectedOrg.org_name}
                >
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {selectedOrg.start_date} - {selectedOrg.end_date || "Present"}</span>
                        </div>

                        <div className="prose dark:prose-invert">
                            <p>{selectedOrg.description}</p>

                            {selectedOrg.achievements && selectedOrg.achievements.length > 0 && (
                                <>
                                    <h4 className="font-semibold text-lg mt-4">Key Achievements</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {selectedOrg.achievements.map((ach, i) => (
                                            <li key={i}>{ach}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>

                        {selectedOrg.link_url && (
                            <Button asChild variant="outline">
                                <a href={selectedOrg.link_url} target="_blank" rel="noopener">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                                </a>
                            </Button>
                        )}
                    </div>
                </DetailModal>
            )}
        </section>
    )
}
