import { Project, Certification, Organization, Skill, Profile, SocialLink } from "@/types"

export const DUMMY_PROFILE: Profile = {
    id: "1",
    full_name: "Alex Sterling",
    headline: "Senior Full-Stack Engineer | AI & Cloud Architect",
    bio_short: "Building scalable web applications and intelligent systems. Passionate about clean code, open source, and user-centric design.",
    bio_long: "With over 6 years of experience in the tech industry, I have worked with startups and large enterprises to deliver high-quality software solutions.",
    location: "San Francisco, CA",
    profile_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    banner_image: null,
    cv_url: "#",
    contact_email: "alex@example.com"
}

export const DUMMY_SOCIALS: SocialLink[] = [
    { id: "1", platform: "github", url: "https://github.com", display_order: 1 },
    { id: "2", platform: "linkedin", url: "https://linkedin.com", display_order: 2 },
    { id: "3", platform: "twitter", url: "https://twitter.com", display_order: 3 }
]

export const DUMMY_PROJECTS: Project[] = [
    {
        id: "1",
        title: "EcoTrack AI",
        slug: "ecotrack-ai",
        type: "PERSONAL",
        project_category: "Forecasting (Tabular)",
        status: "PUBLISHED",
        start_date: "2023-01",
        end_date: "2023-06",
        role: "Lead Developer",
        summary: "AI-powered carbon footprint tracker for enterprises.",
        description: "EcoTrack AI leverages machine learning to analyze corporate energy consumption patterns and suggest actionable reduction strategies. Built with Next.js and Python backend.",
        highlights: ["Reduced energy costs by 15% for beta clients", "Real-time data visualization", "Integrated with IoT sensors"],
        tech_stack: ["Next.js", "Python", "TensorFlow", "AWS"],
        tags: ["AI", "GreenTech", "Web App"],
        metrics: { "Accuracy": "94%", "Users": "500+" },
        github_url: "https://github.com",
        demo_url: "https://example.com",
        article_url: null,
        thumbnail_image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
        gallery_images: ["https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9"],
        created_at: new Date().toISOString()
    },
    {
        id: "2",
        title: "DevFlow SaaS",
        slug: "devflow-saas",
        type: "TEAM",
        project_category: "Klasifikasi Teks",
        status: "PUBLISHED",
        start_date: "2022-05",
        end_date: "2022-12",
        role: "Frontend Architect",
        summary: "Project management tool streamlined for developers.",
        description: "A comprehensive project management suite featuring Kanban boards, git integration, and automated sprint reporting.",
        highlights: ["Real-time collaboration", "GitHub/GitLab integration", "Dark mode first design"],
        tech_stack: ["React", "Redux", "Node.js", "PostgreSQL"],
        tags: ["SaaS", "Productivity"],
        metrics: null,
        github_url: null,
        demo_url: "https://example.com",
        article_url: null,
        thumbnail_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        gallery_images: [],
        created_at: new Date().toISOString()
    },
    {
        id: "3",
        title: "NeuroArt Gen",
        slug: "neuroart-gen",
        type: "PERSONAL",
        project_category: "Klasifikasi Citra",
        status: "PUBLISHED",
        start_date: "2023-08",
        end_date: null,
        role: "Solo Creator",
        summary: "Generative art platform using Stable Diffusion.",
        description: "Web interface for generating high-quality artistic assets using fine-tuned diffusion models.",
        highlights: ["Custom model fine-tuning", "Fast inference API", "Gallery sharing"],
        tech_stack: ["SvelteKit", "FastAPI", "PyTorch"],
        tags: ["Generative AI", "Art"],
        metrics: null,
        github_url: "https://github.com",
        demo_url: null,
        article_url: null,
        thumbnail_image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
        gallery_images: [],
        created_at: new Date().toISOString()
    }
]

export const DUMMY_CERTS: Certification[] = [
    {
        id: "1",
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        issue_date: "2023-04-15",
        expiry_date: "2026-04-15",
        credential_id: "AWS-123456",
        verify_url: "https://aws.amazon.com/verification",
        certificate_image: null,
        linkedin_url: null,
        status: "PUBLISHED",
        created_at: new Date().toISOString()
    },
    {
        id: "2",
        name: "Google Data Analytics Professional Certificate",
        issuer: "Google",
        issue_date: "2023-01-15",
        expiry_date: null,
        credential_id: "G-DATA-789",
        verify_url: "https://coursera.org/verify/google",
        certificate_image: null,
        linkedin_url: null,
        status: "PUBLISHED",
        created_at: new Date().toISOString()
    }
]

export const DUMMY_ORGS: Organization[] = [
    {
        id: "1",
        org_name: "TechNova Inc.",
        role_title: "Senior Internal Engineer",
        start_date: "2021-06",
        end_date: null,
        description: "Leading the internal tools team to improve developer productivity.",
        achievements: ["Reduced build times by 40%", "Migrated legacy monolith to microservices"],
        logo: "https://via.placeholder.com/150",
        link_url: "https://example.com",
        status: "PUBLISHED",
        created_at: new Date().toISOString()
    },
    {
        id: "2",
        org_name: "StartUp Zy",
        role_title: "Full Stack Developer",
        start_date: "2019-03",
        end_date: "2021-05",
        description: "Early employee contributing to core product features.",
        achievements: ["Implemented payment gateway", "Designed initial database schema"],
        logo: "https://via.placeholder.com/150",
        link_url: null,
        status: "PUBLISHED",
        created_at: new Date().toISOString()
    }
]

export const DUMMY_SKILLS: Skill[] = [
    { id: "1", category: "AI/ML", skill_name: "TensorFlow", level: 90, status: "PUBLISHED", created_at: "" },
    { id: "2", category: "AI/ML", skill_name: "PyTorch", level: 85, status: "PUBLISHED", created_at: "" },
    { id: "3", category: "Web", skill_name: "React", level: 95, status: "PUBLISHED", created_at: "" },
    { id: "4", category: "Web", skill_name: "Next.js", level: 92, status: "PUBLISHED", created_at: "" },
    { id: "5", category: "Web", skill_name: "TypeScript", level: 90, status: "PUBLISHED", created_at: "" },
    { id: "6", category: "Tools", skill_name: "Docker", level: 80, status: "PUBLISHED", created_at: "" },
    { id: "7", category: "Tools", skill_name: "Git", level: 95, status: "PUBLISHED", created_at: "" },
    { id: "8", category: "Other", skill_name: "System Design", level: 85, status: "PUBLISHED", created_at: "" },
]
