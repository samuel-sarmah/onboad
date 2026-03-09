import { Header, Features, Footer } from "@/components/landing";

export const metadata = {
  title: "Features - Onboard | Project Management for Small Teams",
  description: "Explore all the powerful features that make Onboard the best project management tool for small teams.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-6">
        <Features />
      </div>
      <Footer />
    </main>
  );
}
