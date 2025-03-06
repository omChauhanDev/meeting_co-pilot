import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Upload",
      description: "Upload your presentation or PDF to our platform",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      number: 2,
      title: "Train",
      description: "We train an AI agent on your specific document",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      number: 3,
      title: "Share",
      description: "You receive a unique link to share with clients",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      number: 4,
      title: "Present",
      description: "Clients join a live session where our AI presents your document",
      icon: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24  w-full max-w-7xl">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four simple steps to automate your presentations
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-secondary/30 hidden md:block" />

          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`md:flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <Card className={`inline-block shadow-lg ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative flex items-center justify-center z-10 my-4 md:my-0">
                  <div className="rounded-full bg-secondary text-white w-12 h-12 flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                </div>

                <div className="flex-1">
                  <div
                    className={`rounded-lg p-4 flex items-center justify-center ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"} max-w-xs`}
                  >
                    {/* <Image
                      src={step.icon || "/placeholder.svg"}
                      alt={step.title}
                      width={80}
                      height={80}
                      className="object-contain"
                    /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

