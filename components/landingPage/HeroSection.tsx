"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileUp, Play } from "lucide-react"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { UploadComponent } from "./UploadDoc"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSeeHowItWorksClick = () => {
    router.push("/")
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()

      // Calculate normalized mouse position (-1 to 1)
      const x = ((clientX - left) / width - 0.5) * 2
      const y = ((clientY - top) / height - 0.5) * 2

      setMousePosition({ x, y })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={heroRef} className="max-h-screen relative pt-32 pb-16 md:pt-26 md:pb-24 overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30 mix-blend-screen particle-animation" />
      </div>

      <div className="container px-4 md:px-6 w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Upload Once,{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Present Forever
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              Let AI explain your documents and presentations to clients so you don't have to repeat yourself
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                    <FileUp className="mr-2 h-5 w-5" />
                    Upload Your Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="">
                  <div className="flex justify-end">
                    <DialogClose asChild>
                    </DialogClose>
                  </div>
                  <UploadComponent />
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="group" onClick={handleSeeHowItWorksClick}>
                <Play className="mr-2 h-5 w-5" />
                Start Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="relative h-[500px] md:h-[600px] perspective">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ai-avatar-container"
              style={{
                transform: `translate(-50%, -50%) 
                           rotateY(${mousePosition.x * 5}deg) 
                           rotateX(${-mousePosition.y * 5}deg)`,
              }}
            >
              <div className="relative w-[220px] h-[300px]">
                <div className="absolute inset-0 rounded-full blur-[40px] opacity-70" />
                <Image
                  src="/agent_avatar.png"
                  alt="AI Presenter Avatar"
                  width={220}
                  height={300}
                  className="relative z-10 object-contain"
                />
                {/* Glowing ring around avatar */}
                <div className="absolute inset-0 border-2 border-secondary rounded-full blur-[2px] animate-pulse opacity-70" />
              </div>
            </div>

            {/* Floating Documents and Slides */}
            {/* Document 1 - Top Right */}
            <div
              className="absolute right-[10%] top-[15%] z-10 floating-element"
              style={{
                transform: `translateZ(20px) 
                           rotateY(${-mousePosition.x * 15}deg) 
                           rotateX(${mousePosition.y * 10}deg)`,
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-secondary to-accent opacity-30 blur-sm rounded-lg" />
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 w-[140px] h-[180px]">
                  <div className="w-full h-[100px] bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                  <div className="w-2/3 h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                  <div className="w-5/6 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
            </div>

            {/* Document 2 - Bottom Left */}
            <div
              className="absolute left-[5%] bottom-[20%] z-30 floating-element-delayed"
              style={{
                transform: `translateZ(50px) 
                           rotateY(${-mousePosition.x * 20}deg) 
                           rotateX(${mousePosition.y * 15}deg)`,
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-accent to-secondary opacity-30 blur-sm rounded-lg" />
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 w-[120px] h-[160px]">
                  <div className="w-full h-[80px] bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                  <div className="w-3/4 h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                  <div className="w-1/2 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
            </div>

            {/* Slide 1 - Top Left */}
            <div
              className="absolute left-[15%] top-[25%] z-0 floating-element-reverse"
              style={{
                transform: `translateZ(-20px) 
                           rotateY(${-mousePosition.x * 10}deg) 
                           rotateX(${mousePosition.y * 5}deg)`,
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tl from-secondary/50 to-accent/50 opacity-20 blur-sm rounded" />
                <div className="relative bg-white dark:bg-gray-800 rounded shadow-lg p-1 w-[160px] h-[120px]">
                  <div className="w-full h-[70px] bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
                  <div className="w-4/5 h-2 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
            </div>

            {/* Slide 2 - Bottom Right */}
            <div
              className="absolute right-[15%] bottom-[30%] z-10 floating-element-slow"
              style={{
                transform: `translateZ(10px) 
                           rotateY(${-mousePosition.x * 12}deg) 
                           rotateX(${mousePosition.y * 8}deg)`,
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-bl from-accent/50 to-secondary/50 opacity-20 blur-sm rounded" />
                <div className="relative bg-white dark:bg-gray-800 rounded shadow-lg p-1 w-[180px] h-[130px]">
                  <div className="w-full h-[80px] bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded mb-1" />
                  <div className="w-3/5 h-2 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
            </div>

            {/* Small floating elements */}
            <div className="absolute left-[30%] top-[60%] z-5 w-10 h-10 bg-secondary/10 backdrop-blur-sm rounded floating-element-fast" />
            <div className="absolute right-[25%] top-[40%] z-5 w-8 h-8 bg-accent/10 backdrop-blur-sm rounded floating-element-faster" />
            <div className="absolute left-[40%] bottom-[20%] z-5 w-12 h-12 bg-secondary/10 backdrop-blur-sm rounded floating-element-slow" />

            {/* Client silhouettes */}
            <div className="absolute left-[10%] bottom-[10%] opacity-40 z-0">
              <div className="w-[40px] h-[60px] bg-gray-400 dark:bg-gray-600 rounded-t-full" />
            </div>
            <div className="absolute left-[20%] bottom-[8%] opacity-30 z-0">
              <div className="w-[35px] h-[55px] bg-gray-400 dark:bg-gray-600 rounded-t-full" />
            </div>
            <div className="absolute left-[30%] bottom-[12%] opacity-50 z-0">
              <div className="w-[45px] h-[65px] bg-gray-400 dark:bg-gray-600 rounded-t-full" />
            </div>

            {/* Light rays */}
            <div className="absolute inset-0 bg-gradient-to-bl from-secondary/10 via-transparent to-accent/10 mix-blend-overlay" />
            <div className="absolute inset-0 light-rays opacity-20" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 via-transparent to-accent/20 pointer-events-none" />
    </section>
  )
}

