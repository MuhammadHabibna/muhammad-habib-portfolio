"use client"

import { useState, useCallback } from "react"
import { pdf } from "@react-pdf/renderer"
import { FileDown, Loader2, AlertCircle } from "lucide-react"
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
    const [status, setStatus] = useState<"idle" | "generating" | "error">("idle")
    const [errorMsg, setErrorMsg] = useState("")

    const handleDownload = useCallback(async () => {
        setStatus("generating")
        setErrorMsg("")
        try {
            const blob = await pdf(
                <PortfolioPDF
                    profile={profile}
                    socials={socials}
                    projects={projects}
                    achievements={achievements}
                    organizations={organizations}
                    certifications={certifications}
                />
            ).toBlob()

            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `${profile.full_name.replace(/\s+/g, "_")}_Portfolio.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
            setStatus("idle")
        } catch (err) {
            console.error("PDF generation error:", err)
            setErrorMsg(err instanceof Error ? err.message : "Failed to generate PDF")
            setStatus("error")
        }
    }, [profile, socials, projects, achievements, organizations, certifications])

    return (
        <div className="inline-flex flex-col items-center gap-1">
            <Button
                variant={variant}
                size={size}
                className={className}
                onClick={handleDownload}
                disabled={status === "generating"}
            >
                {status === "generating" ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                    </>
                ) : status === "error" ? (
                    <>
                        <AlertCircle className="mr-2 h-5 w-5 text-red-400" />
                        Retry
                    </>
                ) : (
                    <>
                        <FileDown className="mr-2 h-5 w-5" />
                        {label}
                    </>
                )}
            </Button>
            {status === "error" && errorMsg && (
                <span className="text-xs text-red-400 max-w-[200px] text-center">{errorMsg}</span>
            )}
        </div>
    )
}
