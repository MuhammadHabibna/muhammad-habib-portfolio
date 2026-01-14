"use client"

import { useState, useMemo } from "react"
import { type Certification } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Award, Linkedin, Calendar, BadgeCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CertificationsProps {
    certifications: Certification[]
}

export function Certifications({ certifications }: CertificationsProps) {
    const [filterIssuer, setFilterIssuer] = useState<string>("ALL")
    const [sortOrder, setSortOrder] = useState<"NEWEST" | "OLDEST">("NEWEST")

    // Extract unique issuers
    const issuers = useMemo(() => {
        const unique = new Set(certifications.map(c => c.issuer))
        return ["ALL", ...Array.from(unique)]
    }, [certifications])

    // Filter and Sort
    const filteredCerts = useMemo(() => {
        let result = [...certifications]

        if (filterIssuer !== "ALL") {
            result = result.filter(c => c.issuer === filterIssuer)
        }

        result.sort((a, b) => {
            const dateA = new Date(a.issue_date || 0).getTime()
            const dateB = new Date(b.issue_date || 0).getTime()
            return sortOrder === "NEWEST" ? dateB - dateA : dateA - dateB
        })

        return result
    }, [certifications, filterIssuer, sortOrder])

    return (
        <section id="certifications" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-20 opacity-20 transform translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-96 h-96 bg-sky-500 rounded-full blur-3xl" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600"
                        >
                            Licenses & Certifications
                        </motion.h2>
                        <p className="text-muted-foreground text-lg">
                            Professional credentials validating expertise and continuous learning.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4">
                        <Select value={filterIssuer} onValueChange={setFilterIssuer}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Issuer" />
                            </SelectTrigger>
                            <SelectContent>
                                {issuers.map(issuer => (
                                    <SelectItem key={issuer} value={issuer}>{issuer === "ALL" ? "All Issuers" : issuer}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={sortOrder} onValueChange={(v: any) => setSortOrder(v)}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NEWEST">Newest First</SelectItem>
                                <SelectItem value="OLDEST">Oldest First</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredCerts.map((cert) => (
                            <motion.div
                                layout
                                key={cert.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300 relative overflow-hidden">
                                    {/* Decorative Blob */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all" />

                                    <CardHeader className="flex flex-row items-start justify-between space-y-0 p-6 pb-2 relative z-10">
                                        <Badge variant="outline" className=" bg-sky-50 dark:bg-sky-900/10 text-sky-600 border-sky-200 dark:border-sky-800">
                                            {cert.issuer}
                                        </Badge>
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                                            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                    </CardHeader>

                                    <CardContent className="p-6 pt-4 space-y-4 relative z-10">
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors mb-2">
                                                {cert.name}
                                            </h3>
                                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                                                <Calendar className="w-3 h-3" />
                                                <span>Issued {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'N/A'}</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50 mt-auto">
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                <BadgeCheck className="w-3.5 h-3.5" />
                                                Verified
                                            </div>

                                            {cert.linkedin_url ? (
                                                <Button size="sm" variant="ghost" className="h-8 gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" asChild>
                                                    <a href={cert.linkedin_url} target="_blank" rel="noopener noreferrer">
                                                        <Linkedin className="w-3.5 h-3.5" /> Credential
                                                    </a>
                                                </Button>
                                            ) : cert.verify_url ? (
                                                <Button size="sm" variant="ghost" className="h-8 gap-2" asChild>
                                                    <a href={cert.verify_url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-3.5 h-3.5" /> Verify
                                                    </a>
                                                </Button>
                                            ) : null}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredCerts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">No certifications found matching filter.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
