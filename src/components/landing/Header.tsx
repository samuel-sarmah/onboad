import Link from "next/link";
import { Button } from "@/components/ui";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0079bf] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-lg text-[#172b4d]">Onboard</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/features" className="px-3 py-1.5 text-sm text-[#5e6c84] hover:text-[#172b4d] hover:bg-[#091e420a] rounded transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="px-3 py-1.5 text-sm text-[#5e6c84] hover:text-[#172b4d] hover:bg-[#091e420a] rounded transition-colors">
              Pricing
            </Link>
            <Link href="/#about" className="px-3 py-1.5 text-sm text-[#5e6c84] hover:text-[#172b4d] hover:bg-[#091e420a] rounded transition-colors">
              Home
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-[#5e6c84] hover:text-[#172b4d] hidden sm:block">
            Log in
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-[#0079bf] hover:bg-[#026aa7] text-white">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
