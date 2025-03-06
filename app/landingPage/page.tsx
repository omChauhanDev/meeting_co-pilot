import FeaturesSection from "@/components/landingPage/FeaturesSection"
import HeroSection from "@/components/landingPage/HeroSection"

export default function Home() {
  return (
    <>
      <HeroSection/>
      <div className="flex flex-col min-h-screen mx-auto w-full max-w-7xl">
        <FeaturesSection />
      </div>
    </>

  )
}

