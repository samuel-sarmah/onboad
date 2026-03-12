import Link from "next/link";
import { Button } from "@/components/ui";

export function CTA() {
  return (
    <section className="py-8 md:py-16 px-3 md:px-4 bg-[#f4f5f7]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#172b4d] mb-3 md:mb-4">
          Ready to organize your team's work?
        </h2>
          <p className="text-sm md:text-base text-[#5e6c84] mb-6 md:mb-8">
          Join thousands of teams already using Onboard to ship faster.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto justify-center">
          <Link href="/signup">
            <Button size="lg" className="bg-[#0079bf] hover:bg-[#026aa7] text-white whitespace-nowrap w-full sm:w-auto">
              Get Started Free
            </Button>
          </Link>
        </div>
        
        <p className="mt-6 text-xs text-[#5e6c84]">
          No credit card required · Free forever for small teams
        </p>
      </div>
    </section>
  );
}
