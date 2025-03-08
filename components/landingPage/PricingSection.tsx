
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals and small teams",
      priceMonthly: 29,
      priceAnnual: 24,
      features: ["Up to 10 documents", "Basic Co-pilot", "Standard Q&A capabilities", "Email support", "1 user"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses",
      priceMonthly: 79,
      priceAnnual: 69,
      features: [
        "Up to 50 documents",
        "Advanced Co-pilot",
        "Enhanced Q&A with context",
        "Priority support",
        "5 users",
        "Analytics dashboard",
        "Custom branding",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      priceMonthly: null,
      priceAnnual: null,
      features: [
        "Unlimited documents",
        "Premium Co-pilot",
        "Advanced Q&A with learning",
        "24/7 dedicated support",
        "Unlimited users",
        "Advanced analytics",
        "Custom integrations",
        "SLA guarantees",
        "Dedicated account manager",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that works best for your needs
          </p>

          <div className="flex items-center justify-center mt-8">
            <Label htmlFor="billing-toggle" className={`mr-2 ${!isAnnual ? "font-medium" : ""}`}>
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
            <Label htmlFor="billing-toggle" className={`ml-2 ${isAnnual ? "font-medium" : ""}`}>
              Annual <span className="text-sm text-secondary">(Save 15%)</span>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${
                plan.popular ? "border-secondary shadow-lg relative md:scale-105" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-white text-sm font-medium py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  {plan.priceMonthly !== null ? (
                    <>
                      <span className="text-4xl font-bold">${isAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
                      <span className="text-muted-foreground">/month</span>
                      {isAnnual && <p className="text-sm text-muted-foreground">billed annually</p>}
                    </>
                  ) : (
                    <span className="text-4xl font-bold">Custom</span>
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-secondary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-secondary hover:bg-secondary/90"
                      : plan.name === "Enterprise"
                        ? "bg-primary hover:bg-primary/90"
                        : ""
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

