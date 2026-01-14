export type ProjectType = 'PERSONAL' | 'TEAM'
export type ProjectCategory =
    | "Klasifikasi Citra"
    | "Object Detection"
    | "Segmentasi Citra"
    | "Object Character Recognition"
    | "Clustering (Tabular)"
    | "Klasifikasi (Tabular)"
    | "Regresi (Tabular)"
    | "Forecasting (Tabular)"
    | "Analisis Sentiment"
    | "Klasifikasi Teks"

export type ContentStatus = 'DRAFT' | 'PUBLISHED'

export interface Project {
    id: string
    title: string
    slug: string
    type: ProjectType
    project_category: ProjectCategory
    status: ContentStatus
    start_date: string | null
    end_date: string | null
    role: string | null
    summary: string | null
    description: string | null
    highlights: string[] | null
    tech_stack: string[] | null
    tags: string[] | null
    metrics: Record<string, string> | null
    github_url: string | null
    demo_url: string | null
    article_url: string | null
    thumbnail_image: string | null
    gallery_images: string[] | null
    created_at: string
}

export interface Certification {
    id: string
    name: string
    issuer: string
    issue_date: string | null
    expiry_date: string | null
    credential_id: string | null
    credential_url: string | null // Standardized from verify_url/linkedin_url
    certificate_image: string | null
    status: ContentStatus
    created_at: string
}

export interface Achievement {
    id: string
    title: string
    event: string
    award: string
    level: string
    year: number
    date: string | null
    description: string
    proof_url: string | null
    proof_image_url: string | null
    proof_image_caption: string | null
    status: ContentStatus
    sort_order: number
    created_at: string
}

export interface Organization {
    id: string
    org_name: string
    role_title: string
    start_date: string | null
    end_date: string | null
    description: string | null
    achievements: string[] | null
    logo: string | null
    link_url: string | null
    status: ContentStatus
    created_at: string
}

export interface Skill {
    id: string
    category: string
    skill_name: string
    level: number | null
    status: ContentStatus
    created_at: string
}

export interface Profile {
    id: string
    full_name: string
    headline: string | null
    bio_short: string | null
    bio_long: string | null
    location: string | null
    profile_photo: string | null
    banner_image: string | null
    cv_url: string | null
    contact_email: string | null
}

export interface SocialLink {
    id: string
    platform: string
    url: string
    display_order: number
}
