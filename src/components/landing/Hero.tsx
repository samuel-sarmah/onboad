import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-28 pb-10 md:pb-16 px-3 md:px-4 bg-gradient-to-b from-white via-[#f8fbff] to-[#eef3f8]">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#0079bf1a] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-[#36b37e1f] blur-3xl" />

      <div className="relative max-w-6xl mx-auto grid gap-8 lg:gap-12 md:grid-cols-2 items-center">
        <div className="text-center md:text-left">
          <div className="hero-reveal hero-delay-1 inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-[#0079bf33] bg-white/90 text-xs font-semibold text-[#0747a6]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Trusted by 2,500+ fast-moving teams
          </div>

          <h1 className="hero-reveal hero-delay-2 text-3xl md:text-4xl lg:text-5xl font-bold text-[#172b4d] leading-tight mb-4 md:mb-6">
            Organize work, deliver faster with your team
          </h1>

          <p className="hero-reveal hero-delay-3 text-sm md:text-lg text-[#5e6c84] mb-6 md:mb-8 max-w-xl md:max-w-2xl mx-auto md:mx-0">
            Onboard helps small teams stay organized with Kanban boards, calendar views, and real-time collaboration. No complex setup - just sign up and start managing projects immediately.
          </p>

          <div className="hero-reveal hero-delay-4 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 mb-6 md:mb-8">
            <Link href="/signup">
              <Button size="lg" className="bg-[#0079bf] hover:bg-[#026aa7] text-white group w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/features" className="text-sm font-medium text-[#0747a6] hover:text-[#0052cc] transition-colors">
              Explore features
            </Link>
          </div>

          <p className="hero-reveal hero-delay-4 text-xs text-[#5e6c84]">
            Free forever for small teams · No credit card required
          </p>
        </div>

        <div className="hero-reveal hero-delay-3 relative mx-auto w-full max-w-md">
          <div className="hero-float rounded-3xl border border-[#dfe1e6] bg-white/95 shadow-[0_18px_40px_-28px_rgba(9,30,66,0.55)] backdrop-blur-sm p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-[#172b4d]">Live trust signals</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#067d3c]">
                <span className="h-2 w-2 rounded-full bg-[#36b37e] animate-pulse" />
                99.98% uptime
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="rounded-xl bg-[#f4f5f7] p-3 text-center">
                <Users className="h-4 w-4 mx-auto mb-1 text-[#0747a6]" />
                <p className="text-sm font-bold text-[#172b4d]">2.5k+</p>
                <p className="text-[10px] text-[#5e6c84]">Active teams</p>
              </div>
              <div className="rounded-xl bg-[#f4f5f7] p-3 text-center">
                <Star className="h-4 w-4 mx-auto mb-1 text-[#ffab00]" />
                <p className="text-sm font-bold text-[#172b4d]">4.9/5</p>
                <p className="text-[10px] text-[#5e6c84]">User rating</p>
              </div>
              <div className="rounded-xl bg-[#f4f5f7] p-3 text-center">
                <CheckCircle2 className="h-4 w-4 mx-auto mb-1 text-[#067d3c]" />
                <p className="text-sm font-bold text-[#172b4d]">120ms</p>
                <p className="text-[10px] text-[#5e6c84]">Realtime sync</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="rounded-xl border border-[#ebecf0] bg-white p-3">
                <p className="text-xs text-[#172b4d] font-medium">"Cut our planning overhead by half in week one."</p>
                <p className="text-[11px] text-[#5e6c84] mt-1">PM Lead, Northline Studio</p>
              </div>
              <div className="rounded-xl border border-[#ebecf0] bg-white p-3">
                <p className="text-xs text-[#172b4d] font-medium">"Everyone sees project updates instantly without extra meetings."</p>
                <p className="text-[11px] text-[#5e6c84] mt-1">Ops Manager, RelayWorks</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#0747a6] bg-[#deebff]">SOC 2</span>
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#067d3c] bg-[#e3fcef]">GDPR Ready</span>
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#593d00] bg-[#fffae6]">24/7 Monitoring</span>
            </div>
          </div>

          <div className="hero-float hero-float-delay absolute -left-4 top-8 hidden sm:block rounded-xl border border-[#dfe1e6] bg-white px-3 py-2 shadow-sm">
            <p className="text-[10px] font-semibold text-[#5e6c84] uppercase tracking-wide">Verified Security</p>
            <p className="text-xs font-bold text-[#172b4d]">Enterprise-grade controls</p>
          </div>
        </div>
      </div>
    </section>
  );
}
