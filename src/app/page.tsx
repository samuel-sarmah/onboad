import { Header, Hero, LandingDemo, Pricing, CTA, Footer } from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <LandingDemo />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
