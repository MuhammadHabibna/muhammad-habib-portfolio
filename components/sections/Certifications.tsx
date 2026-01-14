"use client"

import { useMemo } from "react"
import { type Certification } from "@/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Award, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

interface CertificationsProps {
    certifications: Certification[]
}

export function Certifications({ certifications }: CertificationsProps) {
    // Group by issuer
    const groupedCerts = useMemo(() => {
        const groups: Record<string, Certification[]> = {}
        certifications.forEach(cert => {
            const issuer = cert.issuer || "Other"
            if (!groups[issuer]) groups[issuer] = []
            groups[issuer].push(cert)
        })
        return groups
    }, [certifications])

    return (
        <section id="certifications" className="py-20 bg-slate-50/50 dark:bg-slate-900/50 relative">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600"
                    >
                        Licenses & Certifications
                    </motion.h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Verified credentials showcasing continuous learning and expertise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(groupedCerts).map(([issuer, certs], groupIndex) => (
                        <motion.div
                            key={issuer}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: groupIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Badge variant="secondary" className="text-lg px-4 py-1 rounded-full">{issuer}</Badge>
                            </div>

                            <div className="space-y-4">
                                {certs.map((cert) => (
                                    <Card key={cert.id} className="p-4 hover:shadow-md transition-shadow dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                        <div className="flex justify-between items-start gap-3">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm md:text-base leading-tight mb-1">{cert.name}</h4>
                                                <p className="text-xs text-muted-foreground mb-2">
                                                    Issued: {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'N/A'}
                                                </p>
                                            </div>
                                            {cert.linkedin_url ? (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                                                    <a href={cert.linkedin_url} target="_blank" rel="noopener noreferrer" title="View on LinkedIn">
                                                        <Linkedin className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            ) : cert.verify_url && (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-sky-600 hover:text-sky-700 hover:bg-sky-50" asChild>
                                                    <a href={cert.verify_url} target="_blank" rel="noopener noreferrer" title="Verify">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
