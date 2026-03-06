import { Button, Card, Badge } from "@/components/ui";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For small teams just getting started",
    features: [
      "1 workspace",
      "Up to 3 members",
      "5 projects",
      "Kanban boards",
      "Calendar view",
      "Basic comments"
    ],
    cta: "Start Free",
    variant: "outline" as const
  },
  {
    name: "Starter",
    price: "$8",
    description: "For growing teams that need more",
    popular: true,
    features: [
      "Unlimited workspaces",
      "Up to 10 members",
      "Unlimited projects",
      "All views",
      "Subtasks",
      "Notifications",
      "Progress reports"
    ],
    cta: "Start Free Trial",
    variant: "primary" as const
  },
  {
    name: "Pro",
    price: "$15",
    description: "For teams that need advanced features",
    features: [
      "Everything in Starter",
      "Unlimited members",
      "Priority support",
      "Advanced analytics",
      "Custom workflows",
      "API access",
      "SSO authentication"
    ],
    cta: "Contact Sales",
    variant: "outline" as const
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Start free and scale as your team grows. No hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-2 border-primary' : ''}`}
              padding="lg"
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-blue">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-gray-500">/seat/mo</span>}
                </div>
                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant={plan.variant} className="w-full">
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
