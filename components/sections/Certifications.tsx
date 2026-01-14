"use client"

import { useState } from "react"
import { type Certification } from "@/types"
import { DetailModal } from "@/components/DetailModal"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award } from "lucide-react"

interface CertificationsProps {
    certifications: Certification[]
}

export function Certifications({ certifications }: CertificationsProps) {
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

    return (
        <section id="certifications" className="py-20 relative">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                        Certifications
                    </h2>
                    <div className="w-20 h-1.5 bg-sky-500 rounded-full mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {certifications.map((cert) => (
                        <Card
                            key={cert.id}
                            className="group hover:shadow-lg transition-all cursor-pointer border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden"
                            onClick={() => setSelectedCert(cert)}
                        >
                            <div className="h-32 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-4">
                                {cert.certificate_image ? (
                                    <img src={cert.certificate_image} alt={cert.name} className="h-full object-contain" />
                                ) : (
                                    <Award className="h-12 w-12 text-sky-200 dark:text-sky-900" />
                                )}
                            </div>
                            <CardHeader className="flex flex-col gap-1 p-4">
                                <CardTitle className="text-base line-clamp-2 leading-tight group-hover:text-primary transition-colors h-10">
                                    {cert.name}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground line-clamp-1">{cert.issuer}</p>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-xs text-muted-foreground">Issued: {cert.issue_date ? new Date(cert.issue_date).getFullYear() : 'N/A'}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {selectedCert && (
                <DetailModal
                    isOpen={!!selectedCert}
                    onOpenChange={(open) => !open && setSelectedCert(null)}
                    title={selectedCert.name}
                    description={selectedCert.issuer}
                >
                    <div className="flex flex-col gap-6 items-center">
                        {selectedCert.certificate_image && (
                            <img
                                src={selectedCert.certificate_image}
                                alt={selectedCert.name}
                                className="rounded-xl shadow-lg w-full max-w-lg object-contain bg-white p-2"
                            />
                        )}

                        <div className="grid grid-cols-2 gap-8 w-full max-w-lg text-center">
                            <div>
                                <span className="text-sm text-muted-foreground">Issued</span>
                                <p className="font-semibold">{selectedCert.issue_date}</p>
                            </div>
                            {selectedCert.expiry_date && (
                                <div>
                                    <span className="text-sm text-muted-foreground">Expires</span>
                                    <p className="font-semibold">{selectedCert.expiry_date}</p>
                                </div>
                            )}
                        </div>

                        {selectedCert.verify_url && (
                            <Button asChild size="lg" className="mt-4">
                                <a href={selectedCert.verify_url} target="_blank" rel="noopener">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Verify Credential
                                </a>
                            </Button>
                        )}
                    </div>
                </DetailModal>
            )}
        </section>
    )
}
