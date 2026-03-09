import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs">O</span>
              </div>
              <span className="font-semibold text-sm">Onboard</span>
            </div>
            <p className="text-xs text-gray-500">
              Streamline your team's workflow. Built for small teams who want to get things done.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-xs text-gray-500 hover:text-primary">Features</Link></li>
              <li><Link href="#pricing" className="text-xs text-gray-500 hover:text-primary">Pricing</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-primary">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-xs text-gray-500 hover:text-primary">About</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-primary">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-xs text-gray-500 hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="text-xs text-gray-500 hover:text-primary">Status</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2025 Onboard. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-gray-500 hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
