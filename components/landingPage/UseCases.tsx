import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Scale, Home, ShoppingCart, Users, GraduationCap } from "lucide-react"

export default function UseCases() {
  const industries = [
    {
      icon: <Briefcase className="h-8 w-8 text-secondary" />,
      name: "Financial Advisors",
      benefit: "Explain complex financial concepts and investment strategies to clients without repetitive meetings.",
    },
    {
      icon: <Scale className="h-8 w-8 text-secondary" />,
      name: "Legal Professionals",
      benefit: "Walk clients through legal documents and processes with consistent explanations every time.",
    },
    {
      icon: <Home className="h-8 w-8 text-secondary" />,
      name: "Real Estate Agents",
      benefit: "Present property details and market analyses to potential buyers even when you're unavailable.",
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-secondary" />,
      name: "Sales Teams",
      benefit: "Deliver consistent product presentations that highlight key features and benefits.",
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      name: "HR Departments",
      benefit: "Automate onboarding presentations and policy explanations for new employees.",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-secondary" />,
      name: "Educational Institutions",
      benefit: "Create interactive learning materials that students can engage with at their own pace.",
    },
  ]

  return (
    <section id="use-cases" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Perfect For</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professionals across industries are saving time and improving client experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="mb-2">{industry.icon}</div>
                <CardTitle>{industry.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{industry.benefit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

