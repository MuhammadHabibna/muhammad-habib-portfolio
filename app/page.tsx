import { Navbar } from "@/components/Navbar"
import { BentoProfile } from "@/components/sections/BentoProfile"
import { Projects } from "@/components/sections/Projects"
import { Certifications } from "@/components/sections/Certifications"
import { Organizations } from "@/components/sections/Organizations"
// import { Skills } from "@/components/sections/Skills"
import { Achievements } from "@/components/sections/Achievements"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/Footer"
import { VectorCloudBackground } from "@/components/background/VectorCloudBackground"
import { createClient } from "@/lib/supabase/server"
import { DUMMY_SOCIALS } from "@/lib/data"

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient()

  // Parallel data fetching
  const [
    { data: profile },
    { data: projects },
    { data: certifications },
    { data: organizations },
    // { data: skills },
    { data: achievements }
  ] = await Promise.all([
    supabase.from('profiles').select('*').single(),
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('certifications').select('*').eq('status', 'PUBLISHED').order('issue_date', { ascending: false }),
    supabase.from('organizations').select('*').eq('status', 'PUBLISHED').order('start_date', { ascending: false }),
    // supabase.from('skills').select('*').eq('status', 'PUBLISHED').order('level', { ascending: false }),
    supabase.from('achievements').select('*').eq('status', 'PUBLISHED').order('year', { ascending: false }).order('sort_order', { ascending: true })
  ])

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
    // skills: skills || [],
    achievements: achievements || []
  }

  return (
    <div className="relative min-h-screen">
      <VectorCloudBackground />
      <Navbar />
      <BentoProfile
        profile={portfolioData.profile}
        socials={portfolioData.socials}
        counts={{
          projects: portfolioData.projects.length,
          certifications: portfolioData.certifications.length,
          achievements: portfolioData.achievements.length
        }}
      />
      <Projects projects={portfolioData.projects} />
      <Achievements achievements={portfolioData.achievements} />
      <Organizations organizations={portfolioData.organizations} />
      <Certifications certifications={portfolioData.certifications} />
      {/* <Skills skills={portfolioData.skills} /> */}
      <Contact />
      <Footer />
    </div>
  )
}
