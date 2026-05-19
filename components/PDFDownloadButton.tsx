"use client"

import { useState } from "react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { FileDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortfolioPDF } from "@/components/PortfolioPDF"
import { type Profile, type Project, type Achievement, type Organization, type Certification, type SocialLink } from "@/types"

interface PDFDownloadButtonProps {
    profile: Profile
    socials: SocialLink[]
    projects: Project[]
    achievements: Achievement[]
    organizations: Organization[]
    certifications: Certification[]
    variant?: "default" | "outline" | "ghost"
    size?: "default" | "sm" | "lg" | "icon"
    className?: string
    label?: string
}

export function PDFDownloadButton({
    profile,
    socials,
    projects,
    achievements,
    organizations,
    certifications,
    variant = "outline",
    size = "lg",
    className,
    label = "Download Portfolio",
}: PDFDownloadButtonProps) {
    const [ready, setReady] = useState(false)

    return (
        <div className="inline-flex">
            {!ready ? (
                <Button
                    variant={variant}
                    size={size}
                    className={className}
                    onClick={() => setReady(true)}
                >
                    <FileDown className="mr-2 h-5 w-5" />
                    {label}
                </Button>
            ) : (
                <PDFDownloadLink
                    document={
                        <PortfolioPDF
                            profile={profile}
                            socials={socials}
                            projects={projects}
                            achievements={achievements}
                            organizations={organizations}
                            certifications={certifications}
                        />
                    }
                    fileName={`${profile.full_name.replace(/\s+/g, "_")}_Portfolio.pdf`}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-full px-8 border-slate-300 dark:border-slate-700"
                >
                    {({ loading }) =>
                        loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <FileDown className="mr-2 h-5 w-5" />
                                Save PDF
                            </>
                        )
                    }
                </PDFDownloadLink>
            )}
        </div>
    )
}
