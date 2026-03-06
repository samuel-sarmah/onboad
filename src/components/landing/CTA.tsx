import { Button, Input } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 px-6 bg-primary text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to streamline your workflow?
        </h2>
        <p className="text-gray-400 mb-8">
          Join thousands of teams who ship faster with Onboard.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-1"
          />
          <Button variant="secondary" size="lg" className="whitespace-nowrap">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
        
        <p className="mt-4 text-xs text-gray-500">
          14-day free trial · No credit card required
        </p>
      </div>
    </section>
  );
}
