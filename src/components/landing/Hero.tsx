import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-10 pb-6 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-border rounded-full bg-secondary">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
          <span className="text-xs font-medium text-gray-600">14-day free trial</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight mb-6">
          Work together.
          <br />
          Ship faster.
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Streamline your team's workflow with Kanban boards, calendar views, 
          and real-time collaboration. Built for small teams who want to get things done.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="group">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>
        
        <p className="mt-4 text-xs text-gray-500">
          No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
