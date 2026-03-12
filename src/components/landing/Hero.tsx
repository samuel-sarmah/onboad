import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-16 md:pt-24 pb-8 md:pb-16 px-3 md:px-4 bg-gradient-to-b from-white to-[#f4f5f7]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#172b4d] leading-tight mb-4 md:mb-6">
          Organize work, deliver faster with your team
        </h1>
        
        <p className="text-sm md:text-lg text-[#5e6c84] mb-6 md:mb-10 max-w-xl mx-auto">
          Onboard helps small teams stay organized with Kanban boards, calendar views, and real-time collaboration. No complex setup - just sign up and start managing projects immediately.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link href="/signup">
            <Button size="lg" className="bg-[#0079bf] hover:bg-[#026aa7] text-white group w-full sm:w-auto">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        <p className="text-xs text-[#5e6c84]">
          Free forever for small teams · No credit card required
        </p>
      </div>
    </section>
  );
}
