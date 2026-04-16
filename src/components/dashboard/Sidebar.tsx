"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui";
import { 
  LayoutGrid, 
  Calendar, 
  BarChart3, 
  Settings, 
  Plus,
  Users,
  ChevronDown,
  LogOut,
  Bell,
  HelpCircle
} from "lucide-react";

interface SidebarProps {
  workspaces: { id: string; name: string }[];
  currentWorkspace?: { id: string; name: string };
}

export function Sidebar({ workspaces, currentWorkspace }: SidebarProps) {
  const pathname = usePathname();
  const supabase = createClient();
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);

  const navigation = [
    { name: "Board", href: `/dashboard/${currentWorkspace?.id}`, icon: LayoutGrid },
    { name: "Calendar", href: `/dashboard/${currentWorkspace?.id}/calendar`, icon: Calendar },
    { name: "Team", href: `/dashboard/${currentWorkspace?.id}/team`, icon: Users },
    { name: "Reports", href: `/dashboard/${currentWorkspace?.id}/reports`, icon: BarChart3 },
    { name: "Settings", href: `/dashboard/${currentWorkspace?.id}/settings`, icon: Settings },
    { name: "Help", href: "/guide", icon: HelpCircle },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="w-64 h-screen bg-secondary/30 border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="font-semibold text-lg">Onboard</span>
        </Link>
      </div>

      <div className="p-4">
        <div className="relative">
          <button
            onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
            className="w-full flex items-center justify-between px-3 py-2 bg-white border border-border rounded hover:border-border-dark transition-colors"
          >
            <span className="text-sm font-medium truncate">
              {currentWorkspace?.name || "Select Workspace"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {workspaceMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded shadow-sm z-10">
              {workspaces.map((workspace) => (
                <Link
                  key={workspace.id}
                  href={`/dashboard/${workspace.id}`}
                  className="block px-3 py-2 text-sm hover:bg-secondary transition-colors"
                  onClick={() => setWorkspaceMenuOpen(false)}
                >
                  {workspace.name}
                </Link>
              ))}
              <Link
                href="/dashboard/new-workspace"
                className="block px-3 py-2 text-sm text-primary hover:bg-secondary border-t border-border flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Workspace
              </Link>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-secondary hover:text-primary"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">User</p>
            <p className="text-xs text-gray-500 truncate">user@example.com</p>
          </div>
          <button className="p-1 hover:bg-secondary rounded">
            <Bell className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
}
