import { Navbar } from "@/components/Navbar"
import { BentoProfile } from "@/components/sections/BentoProfile"
import { Projects } from "@/components/sections/Projects"
import { Certifications } from "@/components/sections/Certifications"
import { Organizations } from "@/components/sections/Organizations"
import { Skills } from "@/components/sections/Skills"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/Footer"
import { createClient } from "@/lib/supabase/server"
import { DUMMY_SOCIALS } from "@/lib/data" // Fallback/Static for now if no table exists

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient()

  // Parallel data fetching for performance
  const [
    { data: profile },
    { data: projects },
    { data: certifications },
    { data: organizations },
    { data: skills }
  ] = await Promise.all([
    supabase.from('profiles').select('*').single(),
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('certifications').select('*').eq('status', 'PUBLISHED').order('issue_date', { ascending: false }),
    supabase.from('organizations').select('*').eq('status', 'PUBLISHED').order('start_date', { ascending: false }),
    supabase.from('skills').select('*').eq('status', 'PUBLISHED').order('level', { ascending: false })
  ])

  // Fallback defaults if data is missing (e.g. first load)
  // We use DUMMY_SOCIALS because there is no social_links table/editor yet in the provided context
  const portfolioData = {
    profile: profile || {
      full_name: "Portfolio Owner",
      headline: "Welcome to my portfolio",
      bio_short: "Please configure your profile in the Studio.",
      location: "Internet",
    },
    socials: DUMMY_SOCIALS,
    projects: projects || [],
    certifications: certifications || [],
    organizations: organizations || [],
    skills: skills || []
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <BentoProfile profile={portfolioData.profile} socials={portfolioData.socials} />
      <Projects projects={portfolioData.projects} />
      <Certifications certifications={portfolioData.certifications} />
      <Organizations organizations={portfolioData.organizations} />
      <Skills skills={portfolioData.skills} />
      <Contact />
      <Footer />
    </div>
  )
}
