import Link from "next/link";
import { Button } from "@/components/ui";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="font-semibold text-lg">Onboard</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-gray-600 hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-gray-600 hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-sm text-gray-600 hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-600 hover:text-primary transition-colors hidden sm:block">
            Sign in
          </Link>
          <Button size="sm">
            <Link href="/login" >
            Get Started
          </Link>            
          </Button>
        </div>
      </div>
    </header>
  );
}
