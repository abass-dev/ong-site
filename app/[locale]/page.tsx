import Hero from '@/components/Hero'
import Campaigns from '@/components/Campaigns'
import Impact from '@/components/Impact'
import LatestNews from '@/components/LatestNews'
import Donation from '@/components/Donation'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <Campaigns />
      <Impact />
      <Projects />
      <Donation />
      <LatestNews />
    </div>
  )
}

