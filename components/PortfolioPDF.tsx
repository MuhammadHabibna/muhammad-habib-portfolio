"use client"

import {
    Document, Page, Text, View, Link, Font, StyleSheet,
} from "@react-pdf/renderer"
import { type Profile, type Project, type Achievement, type Organization, type Certification, type SocialLink } from "@/types"

Font.register({
    family: "Inter",
    fonts: [
        { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.woff2", fontWeight: 400 },
        { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.woff2", fontWeight: 600 },
        { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.woff2", fontWeight: 700 },
    ],
})

Font.register({
    family: "JetBrainsMono",
    fonts: [
        { src: "https://fonts.gstatic.com/s/jetbrainsmono/v20/tDbY2oqE7hBNaTiNrG7AhjMY-9I0E5Kk6N4qAho1rApn8J6Rg.woff2", fontWeight: 400 },
    ],
})

const styles = StyleSheet.create({
    page: {
        fontFamily: "Inter",
        fontSize: 11,
        color: "#334155",
        padding: 48,
        backgroundColor: "#ffffff",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    name: {
        fontSize: 28,
        fontWeight: 700,
        color: "#0f172a",
        letterSpacing: -0.5,
    },
    headline: {
        fontSize: 13,
        color: "#0284c7",
        fontWeight: 600,
        marginTop: 4,
    },
    contactCol: {
        textAlign: "right",
        fontSize: 9,
        color: "#64748b",
        lineHeight: 1.5,
    },
    contactLink: {
        color: "#0284c7",
        textDecoration: "none",
    },
    bio: {
        fontSize: 10,
        color: "#475569",
        lineHeight: 1.6,
        marginTop: 10,
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: "#e2e8f0",
        marginVertical: 14,
    },
    thinDivider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 8,
    },
    sectionTitle: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    sectionBar: {
        width: 4,
        height: 18,
        backgroundColor: "#0ea5e9",
        borderRadius: 4,
        marginRight: 8,
    },
    sectionText: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2,
        color: "#0284c7",
    },
    projectRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    projectTitle: {
        fontSize: 11,
        fontWeight: 700,
        color: "#0f172a",
    },
    projectType: {
        fontSize: 8,
        fontWeight: 400,
        color: "#94a3b8",
        marginLeft: 6,
    },
    projectRole: {
        fontSize: 8,
        color: "#64748b",
        marginTop: 2,
    },
    projectDate: {
        fontSize: 8,
        color: "#94a3b8",
        fontFamily: "JetBrainsMono",
    },
    projectSummary: {
        fontSize: 9,
        color: "#475569",
        lineHeight: 1.5,
        marginTop: 4,
    },
    highlightItem: {
        fontSize: 9,
        color: "#64748b",
        lineHeight: 1.5,
        marginLeft: 8,
    },
    techRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 5,
        gap: 4,
    },
    techBadge: {
        fontSize: 7,
        fontFamily: "JetBrainsMono",
        backgroundColor: "#f1f5f9",
        color: "#475569",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
    },
    linkSmall: {
        fontSize: 7,
        color: "#0284c7",
        fontFamily: "JetBrainsMono",
        textDecoration: "none",
    },
    linksRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 5,
    },
    entryTitle: {
        fontSize: 11,
        fontWeight: 700,
        color: "#0f172a",
    },
    entrySub: {
        fontSize: 8,
        color: "#64748b",
        marginTop: 2,
    },
    entryDate: {
        fontSize: 8,
        color: "#94a3b8",
        fontFamily: "JetBrainsMono",
    },
    entryDesc: {
        fontSize: 9,
        color: "#475569",
        lineHeight: 1.5,
        marginTop: 4,
    },
    footer: {
        position: "absolute",
        bottom: 32,
        left: 48,
        right: 48,
        fontSize: 7,
        color: "#cbd5e1",
        textAlign: "center",
    },
})

function formatDate(dateStr: string | null): string {
    if (!dateStr) return "Present"
    try {
        const d = new Date(dateStr)
        return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    } catch {
        return dateStr
    }
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <View style={styles.sectionTitle}>
            <View style={styles.sectionBar} />
            <Text style={styles.sectionText}>{children}</Text>
        </View>
    )
}

interface PortfolioPDFProps {
    profile: Profile
    socials: SocialLink[]
    projects: Project[]
    achievements: Achievement[]
    organizations: Organization[]
    certifications: Certification[]
}

export function PortfolioPDF({
    profile,
    socials,
    projects,
    achievements,
    organizations,
    certifications,
}: PortfolioPDFProps) {
    return (
        <Document title={`${profile.full_name} - Portfolio`} author={profile.full_name}>
            {/* PAGE 1: Profile + Projects */}
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.headerRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{profile.full_name}</Text>
                        <Text style={styles.headline}>{profile.headline}</Text>
                    </View>
                    <View style={styles.contactCol}>
                        {profile.location && <Text>{profile.location}</Text>}
                        {profile.contact_email && (
                            <Link src={`mailto:${profile.contact_email}`} style={styles.contactLink}>
                                {profile.contact_email}
                            </Link>
                        )}
                        {socials.map(s => (
                            <Link key={s.id} src={s.url} style={styles.contactLink}>
                                {s.platform}
                            </Link>
                        ))}
                    </View>
                </View>

                {profile.bio_short && <Text style={styles.bio}>{profile.bio_short}</Text>}

                <View style={styles.divider} />

                {/* Projects */}
                <SectionTitle>Projects</SectionTitle>
                {projects.map((p, idx) => (
                    <View key={p.id} style={{ marginBottom: 14 }}>
                        <View style={styles.projectRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.projectTitle}>
                                    {p.title}
                                    {p.type && <Text style={styles.projectType}> [{p.type}]</Text>}
                                </Text>
                                {p.role && <Text style={styles.projectRole}>{p.role}</Text>}
                            </View>
                            <Text style={styles.projectDate}>
                                {formatDate(p.start_date)} – {formatDate(p.end_date)}
                            </Text>
                        </View>
                        {p.summary && <Text style={styles.projectSummary}>{p.summary}</Text>}
                        {p.highlights && p.highlights.length > 0 && (
                            <View style={{ marginTop: 4, marginLeft: 8 }}>
                                {p.highlights.map((h, i) => (
                                    <Text key={i} style={styles.highlightItem}>• {h}</Text>
                                ))}
                            </View>
                        )}
                        {p.tech_stack && p.tech_stack.length > 0 && (
                            <View style={styles.techRow}>
                                {p.tech_stack.map(t => (
                                    <Text key={t} style={styles.techBadge}>{t}</Text>
                                ))}
                            </View>
                        )}
                        {(p.github_url || p.demo_url) && (
                            <View style={styles.linksRow}>
                                {p.github_url && <Link src={p.github_url} style={styles.linkSmall}>GitHub ↗</Link>}
                                {p.demo_url && <Link src={p.demo_url} style={styles.linkSmall}>Demo ↗</Link>}
                            </View>
                        )}
                        {idx < projects.length - 1 && <View style={styles.thinDivider} />}
                    </View>
                ))}

                <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}  •  Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
                )} fixed />
            </Page>

            {/* PAGE 2: Achievements + Experience + Certifications */}
            <Page size="A4" style={styles.page}>
                {achievements.length > 0 && (
                    <View>
                        <SectionTitle>Achievements & Competitions</SectionTitle>
                        {achievements.map((a, idx) => (
                            <View key={a.id} style={{ marginBottom: 10 }}>
                                <View style={styles.projectRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.entryTitle}>{a.title}</Text>
                                        <Text style={styles.entrySub}>{a.event} • {a.award} • {a.level}</Text>
                                    </View>
                                    <Text style={styles.entryDate}>{a.year}</Text>
                                </View>
                                <Text style={styles.entryDesc}>{a.description}</Text>
                                {idx < achievements.length - 1 && <View style={styles.thinDivider} />}
                            </View>
                        ))}
                    </View>
                )}

                {organizations.length > 0 && (
                    <View>
                        <SectionTitle>Working Experience</SectionTitle>
                        {organizations.map((o, idx) => (
                            <View key={o.id} style={{ marginBottom: 10 }}>
                                <View style={styles.projectRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.entryTitle}>
                                            {o.role_title}
                                            <Text style={{ fontSize: 8, fontWeight: 400, color: "#94a3b8" }}> at </Text>
                                            {o.org_name}
                                        </Text>
                                    </View>
                                    <Text style={styles.entryDate}>
                                        {formatDate(o.start_date)} – {formatDate(o.end_date)}
                                    </Text>
                                </View>
                                {o.description && <Text style={styles.entryDesc}>{o.description}</Text>}
                                {o.achievements && o.achievements.length > 0 && (
                                    <View style={{ marginTop: 4, marginLeft: 8 }}>
                                        {o.achievements.map((a, i) => (
                                            <Text key={i} style={styles.highlightItem}>• {a}</Text>
                                        ))}
                                    </View>
                                )}
                                {o.link_url && <Link src={o.link_url} style={{ ...styles.linkSmall, marginTop: 4 }}>Website ↗</Link>}
                                {idx < organizations.length - 1 && <View style={styles.thinDivider} />}
                            </View>
                        ))}
                    </View>
                )}

                {certifications.length > 0 && (
                    <View>
                        <SectionTitle>Licenses & Certifications</SectionTitle>
                        {certifications.map((c, idx) => (
                            <View key={c.id} style={{ marginBottom: 10 }}>
                                <View style={styles.projectRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.entryTitle}>{c.name}</Text>
                                        <Text style={styles.entrySub}>
                                            Issued by {c.issuer}
                                            {c.credential_id && (
                                                <Text style={{ fontFamily: "JetBrainsMono", color: "#94a3b8", marginLeft: 6 }}>
                                                    {" "}ID: {c.credential_id}
                                                </Text>
                                            )}
                                        </Text>
                                    </View>
                                    <Text style={styles.entryDate}>{formatDate(c.issue_date)}</Text>
                                </View>
                                {c.credential_url && (
                                    <Link src={c.credential_url} style={{ ...styles.linkSmall, marginTop: 4 }}>Verify Credential ↗</Link>
                                )}
                                {idx < certifications.length - 1 && <View style={styles.thinDivider} />}
                            </View>
                        ))}
                    </View>
                )}

                <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} of ${totalPages}  •  Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
                )} fixed />
            </Page>
        </Document>
    )
}
