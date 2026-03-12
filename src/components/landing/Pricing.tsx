import Link from "next/link";
import { Button, Card, Badge } from "@/components/ui";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for small teams just getting started.",
    features: [
      "Up to 3 team members",
      "Up to 5 projects",
      "Kanban boards",
      "Calendar view",
      "Basic notifications",
      "50MB file storage"
    ],
    cta: "Get Started",
    variant: "outline" as const
  },
  {
    name: "Pro",
    price: "$8",
    description: "For growing teams that need more power.",
    popular: true,
    features: [
      "Up to 10 team members",
      "Unlimited projects",
      "All board views",
      "Subtasks & checklists",
      "Priority notifications",
      "5GB file storage"
    ],
    cta: "Start Free Trial",
    variant: "primary" as const
  },
  {
    name: "Business",
    price: "$25",
    description: "For teams that need advanced features.",
    features: [
      "Unlimited team members",
      "Custom workflows",
      "Advanced analytics",
      "Priority support",
      "API access",
      "100GB file storage"
    ],
    cta: "Contact Sales",
    variant: "outline" as const
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-6 md:py-16 px-3 md:px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#172b4d] mb-3 md:mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-sm md:text-base text-[#5e6c84] max-w-md mx-auto">
            Start free and scale as your team grows. No hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 ${plan.popular ? 'border-[#0079bf]' : 'border-[#dfe1e6]'} hover:border-[#0079bf] transition-colors`}
              padding="lg"
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0079bf] text-white px-3 py-1">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="font-semibold text-lg text-[#172b4d] mb-1">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-[#172b4d]">{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-[#5e6c84]">/month</span>}
                </div>
                <p className="text-sm text-[#5e6c84] mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#172b4d]">
                    <Check className="w-4 h-4 text-[#61bd4f] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/signup" className="block">
                <Button 
                  className={`w-full ${plan.variant === "primary" ? "bg-[#0079bf] hover:bg-[#026aa7] text-white" : "border-[#dfe1e6] text-[#172b4d] hover:bg-[#f4f5f7]"}`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
