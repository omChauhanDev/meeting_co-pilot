import { MessageSquare, Clock, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesSection() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-secondary" />,
      title: "Interactive Q&A",
      description: "Clients ask questions and get immediate, contextual answers based on your document content.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-accent" />,
      title: "Visual References",
      description:
        "AI shows relevant slides while explaining concepts, making complex information easier to understand.",
    },
    {
      icon: <Clock className="h-10 w-10 text-secondary" />,
      title: "Always Available",
      description: "Clients can schedule sessions at their convenience, 24/7, without waiting for your availability.",
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24 bg-muted/50 w-full max-w-7xl">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">AI-Powered Document Presentations</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge AI technology transforms your static documents into interactive experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/20"
            >
              <CardHeader>
                <div className="transition-transform duration-300 group-hover:scale-110 mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

