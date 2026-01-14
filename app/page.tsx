import { fetchPortfolioData } from "@/lib/fetch"
import { Navbar } from "@/components/Navbar"
import { BentoProfile } from "@/components/sections/BentoProfile"
import { Projects } from "@/components/sections/Projects"
import { Certifications } from "@/components/sections/Certifications"
import { Organizations } from "@/components/sections/Organizations"
import { Skills } from "@/components/sections/Skills"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/Footer"

export default async function Home() {
  const data = await fetchPortfolioData()

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <BentoProfile profile={data.profile} socials={data.socials} />
      <Projects projects={data.projects} />
      <Certifications certifications={data.certifications} />
      <Organizations organizations={data.organizations} />
      <Skills skills={data.skills} />
      <Contact />
      <Footer />
    </div>
  )
}
