import { Navbar } from "@/components/Navbar"
import { HomeSection } from "@/components/sections/HomeSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { TechStackMarquee } from "@/components/sections/TechStackMarquee"
import { Projects } from "@/components/sections/Projects"
import { Certifications } from "@/components/sections/Certifications"
import { Organizations } from "@/components/sections/Organizations"
import { Achievements } from "@/components/sections/Achievements"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/Footer"
import { SectionDivider } from "@/components/SectionDivider"
import { VectorCloudBackground } from "@/components/background/VectorCloudBackground"
import { PageTransition } from "@/components/PageTransition"
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
    { data: achievements }
  ] = await Promise.all([
    supabase.from('profiles').select('*').single(),
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('certifications').select('*').eq('status', 'PUBLISHED').order('issue_date', { ascending: false }),
    supabase.from('organizations').select('*').eq('status', 'PUBLISHED').order('start_date', { ascending: false }),
    supabase.from('achievements').select('*').eq('status', 'PUBLISHED').order('year', { ascending: false }).order('sort_order', { ascending: true })
  ])

  const portfolioData = {
    profile: profile || {
      id: "",
      full_name: "Portfolio Owner",
      headline: "Welcome to my portfolio",
      tagline: null,
      bio_short: "Please configure your profile in the Studio.",
      bio_long: null,
      location: "Internet",
      profile_photo: null,
      banner_image: null,
      cv_url: null,
      contact_email: null,
    },
    socials: DUMMY_SOCIALS,
    projects: projects || [],
    certifications: certifications || [],
    organizations: organizations || [],
    achievements: achievements || []
  }

  const counts = {
    projects: portfolioData.projects.length,
    certifications: portfolioData.certifications.length,
    achievements: portfolioData.achievements.length,
  }

  return (
    <div className="relative min-h-screen">
      <VectorCloudBackground />
      <PageTransition>
        <Navbar />

        {/* ── Home Hero ──────────────────────── */}
        <HomeSection
          profile={portfolioData.profile}
          socials={portfolioData.socials}
        />

        <SectionDivider variant="wave" />

        {/* ── About ─────────────────────────── */}
        <AboutSection
          profile={portfolioData.profile}
          socials={portfolioData.socials}
          projects={portfolioData.projects}
          achievements={portfolioData.achievements}
          certifications={portfolioData.certifications}
          counts={counts}
        />

        <SectionDivider variant="curve" flip />

        {/* ── Tech Stack Marquee ────────────── */}
        <TechStackMarquee />

        <SectionDivider variant="wave" />

        {/* ── Projects ──────────────────────── */}
        <Projects projects={portfolioData.projects} />

        <SectionDivider variant="wave" />

        {/* ── Achievements ──────────────────── */}
        <Achievements achievements={portfolioData.achievements} />

        <SectionDivider variant="angled" flip />

        {/* ── Organizations / Experience ─────── */}
        <Organizations organizations={portfolioData.organizations} />

        <SectionDivider variant="curve" />

        {/* ── Certifications ─────────────────── */}
        <Certifications certifications={portfolioData.certifications} />

        <SectionDivider variant="wave" flip />

        {/* ── Contact ───────────────────────── */}
        <Contact />

        <Footer />
      </PageTransition>
    </div>
  )
}
