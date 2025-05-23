import FaqSection from "@/components/landingPage/FaqSection"
import FeaturesSection from "@/components/landingPage/FeaturesSection"
import HeroSection from "@/components/landingPage/HeroSection"
import HowItWorks from "@/components/landingPage/HowItWorks"
import PricingSection from "@/components/landingPage/PricingSection"
import UseCases from "@/components/landingPage/UseCases"

export default function Home() {
  return (
    <>
      <HeroSection/>
      <div className="flex flex-col min-h-screen mx-auto w-full max-w-7xl">
        <FeaturesSection />
        <HowItWorks/>
        <UseCases/>
        <PricingSection/>
        <FaqSection/>
      </div>
    </>

  )
}

