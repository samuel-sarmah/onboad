"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border relative">
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
            <Link href="/guide" className="px-3 py-1.5 text-sm text-[#5e6c84] hover:text-[#172b4d] hover:bg-[#091e420a] rounded transition-colors">
              Help Center
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
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#5e6c84] hover:text-[#172b4d]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 right-0 bg-white border-t border-l border-b border-border shadow-lg">
          <nav className="flex flex-col p-2 gap-1">
            <Link 
              href="/features" 
              className="px-4 py-2 text-sm text-[#5e6c84] hover:text-[#172b4d] hover:bg-[#091e420a] rounded transition-colors text-right"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#pricing" 
              className="px-4 py-2 text-sm text-[#5e6c84] hover:text-[#172b4d] hover:bg-[#091e420a] rounded transition-colors text-right"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/guide" 
              className="px-4 py-2 text-sm text-[#5e6c84] hover:text-[#172b4d] hover:bg-[#091e420a] rounded transition-colors text-right"
              onClick={() => setMobileMenuOpen(false)}
            >
              Help Center
            </Link>
            <Link 
              href="/#about" 
              className="px-4 py-2 text-sm text-[#5e6c84] hover:text-[#172b4d] hover:bg-[#091e420a] rounded transition-colors text-right"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm text-[#5e6c84] hover:text-[#172b4d] hover:bg-[#091e420a] rounded transition-colors text-right"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
