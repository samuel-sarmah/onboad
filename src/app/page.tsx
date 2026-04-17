import { Header, Hero, LandingDemo, Pricing, CTA, Footer } from "@/components/landing";
import { ChatProvider, ChatWidget } from "@/components/chat";

export default function Home() {
  return (
    <ChatProvider workspaceId="">
      <main className="min-h-screen bg-white">
        <Header />
        <Hero />
        <LandingDemo />
        <Pricing />
        <CTA />
        <Footer />
      </main>
      <ChatWidget />
    </ChatProvider>
  );
}
