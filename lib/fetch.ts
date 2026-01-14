import { createClient } from "@/lib/supabase/client"
import { DUMMY_PROFILE, DUMMY_PROJECTS, DUMMY_CERTS, DUMMY_ORGS, DUMMY_SKILLS, DUMMY_SOCIALS } from "@/lib/data"
import { Profile, Project, Certification, Organization, Skill, SocialLink } from "@/types"

// This would normally run on server, but for simplicity we can check client-side or server-side.
// Since we are using Supabase client (browser), this is client-side fetching helper, 
// OR we can make a server-side version.
// For the page.tsx (Server Component), we should use createClient from 'lib/supabase/server'
// But to share logic, we can just return dummy data if env is missing or fetch fails.

export async function fetchPortfolioData() {
    // In a real scenario, we would allow the server component to pass the supabase client
    // or instantiate it here.
    // For now, let's just return dummy data directly to ensure the UI works immediately
    // as per "Required Deliverables: Seed/dummy data so UI looks alive instantly"

    // TODO: Implement actual Supabase fetch
    // const supabase = createClient()
    // const { data: profile } = await supabase.from('profiles').select('*').single()
    // ...

    // Returning dummy data for immediate "Alive" UI.
    return {
        profile: DUMMY_PROFILE,
        projects: DUMMY_PROJECTS,
        certifications: DUMMY_CERTS,
        organizations: DUMMY_ORGS,
        skills: DUMMY_SKILLS,
        socials: DUMMY_SOCIALS
    }
}
