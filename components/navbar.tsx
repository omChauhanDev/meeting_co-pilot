"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleGetStarted = () => {
    router.push("/")
  }

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto container flex items-center justify-between h-16 md:h-20">
        <Link href="/landingPage" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Presenter AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="#use-cases" className="text-foreground/80 hover:text-foreground transition-colors">
            Use Cases
          </Link>
          <Link href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button className="bg-secondary hover:bg-secondary/90 text-white" onClick={handleGetStarted}>Get Started</Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Features
              </Link>
              <Link href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                How It Works
              </Link>
              <Link href="#use-cases" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Use Cases
              </Link>
              <Link href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Pricing
              </Link>
              <Button className="bg-secondary hover:bg-secondary/90 text-white w-full mt-2">Get Started</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

