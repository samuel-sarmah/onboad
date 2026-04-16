"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button, Input, Card } from "@/components/ui";
import {
  Search,
  Book,
  LayoutGrid,
  Calendar,
  Users,
  BarChart3,
  Settings,
  CheckCircle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

interface GuideSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: {
    title: string;
    description: string;
    steps?: string[];
    tips?: string[];
  }[];
}

const guideSections: Record<string, GuideSection> = {
  gettingStarted: {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    content: [
      {
        title: "Welcome to Onboard",
        description:
          "Onboard is a project management tool designed for small teams. It helps you organize tasks, track deadlines, and collaborate with your team effectively.",
        tips: [
          "Create your free account to get started",
          "Set up your first workspace for your team",
          "Invite team members to collaborate",
        ],
      },
      {
        title: "Quick Start Guide",
        description:
          "Follow these steps to set up your workspace and start managing projects in minutes.",
        steps: [
          "Create an account and verify your email",
          "Create your first workspace (e.g., 'Marketing Team', 'Product Development')",
          "Create a new project within your workspace",
          "Set up columns for your workflow (e.g., To Do, In Progress, Review, Done)",
          "Start adding tasks to your columns",
          "Invite team members to collaborate",
        ],
      },
      {
        title: "Key Concepts",
        description:
          "Understanding these core concepts will help you make the most of Onboard.",
        tips: [
          "Workspaces contain multiple projects and team members",
          "Projects organize tasks around specific goals or campaigns",
          "Tasks can have priorities, due dates, assignees, and subtasks",
          "Columns represent stages in your workflow",
        ],
      },
    ],
  },
  dashboard: {
    id: "dashboard",
    title: "Dashboard & Kanban Board",
    icon: LayoutGrid,
    content: [
      {
        title: "Understanding the Dashboard",
        description:
          "The dashboard is your central hub for managing projects. From here, you can access all your workspaces and projects.",
        tips: [
          "Use the sidebar to navigate between different sections",
          "Select your workspace from the dropdown at the top",
          "Quickly access recent projects from the dashboard home",
        ],
      },
      {
        title: "Using the Kanban Board",
        description:
          "Kanban boards help you visualize your workflow and track task progress at a glance.",
        steps: [
          "Navigate to your project by clicking on it from the dashboard",
          "View tasks organized into columns (default: To Do, In Progress, Review, Done)",
          "Drag and drop tasks between columns to update their status",
          "Tasks are automatically sorted within columns by due date or position",
        ],
      },
      {
        title: "Creating Tasks",
        description:
          "Add new tasks to keep your team aligned and nothing falls through the cracks.",
        steps: [
          "Click the 'Add Task' button or use the + icon on any column",
          "Enter a descriptive title for the task",
          " Optionally set a priority (Low, Medium, High, Urgent)",
          "Add an optional due date to track deadlines",
          "Click 'Create' to add the task to the selected column",
        ],
      },
      {
        title: "Editing Tasks",
        description:
          "Keep task details up to date as work progresses.",
        steps: [
          "Click on any task card to open the task details",
          "Use the edit icon to modify task information",
          "Update the title, description, priority, or due date",
          "Click 'Save Changes' to apply your updates",
        ],
      },
      {
        title: "Task Priorities",
        description:
          "Priorities help your team focus on the most important work first.",
        tips: [
          "Urgent: Needs immediate attention",
          "High: Important and time-sensitive",
          "Medium: Standard priority tasks",
          "Low: Nice to have, no rush",
        ],
      },
    ],
  },
  calendar: {
    id: "calendar",
    title: "Calendar View",
    icon: Calendar,
    content: [
      {
        title: "Calendar Overview",
        description:
          "The calendar view gives you a timeline perspective of all your tasks and deadlines.",
        tips: [
          "Click on any date to view tasks due that day",
          "Navigate between months using the arrows",
          "Tasks appear on their due dates in the calendar",
          "Color-coded priorities make it easy to spot urgent items",
        ],
      },
      {
        title: "Viewing Deadlines",
        description:
          "Never miss a deadline with the calendar's deadline visualization.",
        steps: [
          "Navigate to the Calendar section from the sidebar",
          "Browse tasks by day, week, or month view",
          "Click on a task to see full details or mark it complete",
          "Tasks without due dates won't appear in calendar view",
        ],
      },
      {
        title: "Planning with Calendar",
        description:
          "Use the calendar to plan upcoming work and avoid overloading certain days.",
        tips: [
          "Check for clustering of tasks on specific dates",
          "Spread out work by adjusting due dates",
          "Use it for sprint planning and capacity planning",
          "Share calendar views with stakeholders",
        ],
      },
    ],
  },
  team: {
    id: "team",
    title: "Team Management",
    icon: Users,
    content: [
      {
        title: "Team Overview",
        description:
          "Manage your team members and their access levels from the Team section.",
        tips: [
          "View all team members in one place",
          "See each member's role and current assignments",
          "Quickly identify who's working on what",
        ],
      },
      {
        title: "Inviting Team Members",
        description:
          "Grow your team by inviting colleagues to join your workspace.",
        steps: [
          "Navigate to the Team section from the sidebar",
          "Click 'Invite Member' or use the invite form",
          "Enter the colleague's email address",
          "Select an appropriate role (Admin, Manager, Member, Viewer)",
          "Send the invitation",
          "They'll receive an email to join your workspace",
        ],
      },
      {
        title: "Role Permissions",
        description:
          "Understanding roles helps you control access and maintain security.",
        tips: [
          "Admin: Full access to all workspace settings and data",
          "Manager: Can manage projects, tasks, and team members",
          "Member: Can create and edit tasks, comment on work",
          "Viewer: Can view projects and tasks but cannot make changes",
        ],
      },
      {
        title: "Managing Team Roles",
        description:
          "Adjust team member permissions as responsibilities change.",
        steps: [
          "Go to the Team section",
          "Find the team member you want to modify",
          "Click on their current role to change it",
          "Select the new role from the dropdown",
          "Changes take effect immediately",
        ],
      },
    ],
  },
  reports: {
    id: "reports",
    title: "Reports & Analytics",
    icon: BarChart3,
    content: [
      {
        title: "Understanding Reports",
        description:
          "Reports give you insights into your team's productivity and project progress.",
        tips: [
          "Track task completion rates over time",
          "Identify bottlenecks in your workflow",
          "Measure team velocity and capacity",
          "Make data-driven decisions for your projects",
        ],
      },
      {
        title: "Key Metrics",
        description:
          "Learn about the key performance indicators available in reports.",
        tips: [
          "Tasks Completed: Total tasks finished in a period",
          "Tasks by Priority: Distribution of urgent vs. low priority work",
          "Time in Columns: How long tasks spend in each workflow stage",
          "Team Workload: Distribution of tasks across team members",
        ],
      },
      {
        title: "Using Reports",
        description:
          "Leverage reports to improve your team's performance.",
        steps: [
          "Navigate to the Reports section from the sidebar",
          "Select a date range for your analysis",
          "Review the various charts and metrics",
          "Use insights to optimize your workflow",
          "Share reports with stakeholders as needed",
        ],
      },
    ],
  },
  settings: {
    id: "settings",
    title: "Settings",
    icon: Settings,
    content: [
      {
        title: "Workspace Settings",
        description:
          "Configure your workspace to match your team's needs.",
        tips: [
          "Update workspace name and description",
          "Manage default column names and colors",
          "Configure notification preferences",
          "Archive completed projects",
        ],
      },
      {
        title: "Profile Settings",
        description:
          "Keep your profile up to date and customize your experience.",
        steps: [
          "Click on your profile in the sidebar",
          "Update your display name and email",
          "Add or change your avatar",
          "Update notification settings",
          "Change your password for security",
        ],
      },
      {
        title: "Notification Preferences",
        description:
          "Control how and when you receive notifications.",
        tips: [
          "Task assignments: Get notified when tasks are assigned to you",
          "Due date reminders: Receive alerts before deadlines",
          "Comments: Stay updated on task discussions",
          "Team updates: Know when new members join your workspace",
        ],
      },
    ],
  },
};

const tableOfContents = [
  { id: "gettingStarted", title: "Getting Started" },
  { id: "dashboard", title: "Dashboard & Kanban Board" },
  { id: "calendar", title: "Calendar View" },
  { id: "team", title: "Team Management" },
  { id: "reports", title: "Reports & Analytics" },
  { id: "settings", title: "Settings" },
];

export default function GuidePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("gettingStarted");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId] || document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const filteredSections = searchQuery
    ? Object.values(guideSections).filter(
        (section) =>
          section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          section.content.some(
            (item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : Object.values(guideSections);

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0079bf] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-lg text-[#172b4d]">Onboard</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-[#5e6c84] hover:text-[#172b4d]"
            >
              Back to App
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <nav className="space-y-1">
                {tableOfContents.map((item) => {
                  const section = guideSections[item.id];
                  const Icon = section.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-white hover:text-primary"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.title}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 p-4 bg-white rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Need more help?</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Contact our support team for personalized assistance.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0">
            {/* Hero Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#172b4d] mb-2">
                Help Center
              </h1>
              <p className="text-gray-600">
                Everything you need to know about using Onboard. Browse guides
                below or search for specific topics.
              </p>
            </div>

            {/* Mobile Search */}
            <div className="mb-6 lg:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Guide Sections */}
            <div className="space-y-12">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => { sectionRefs.current[section.id] = el; }}
                    className="scroll-mt-20"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#172b4d]">
                        {section.title}
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {section.content.map((item, index) => (
                        <Card key={index} className="p-6">
                          <h3 className="text-lg font-semibold text-[#172b4d] mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{item.description}</p>

                          {item.steps && item.steps.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-700">
                                Steps:
                              </h4>
                              <ol className="space-y-2">
                                {item.steps.map((step, stepIndex) => (
                                  <li
                                    key={stepIndex}
                                    className="flex gap-3 text-sm"
                                  >
                                    <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                                      {stepIndex + 1}
                                    </span>
                                    <span className="text-gray-600">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {item.tips && item.tips.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-700">
                                {item.title.toLowerCase().includes("permissions") ||
                                item.title.toLowerCase().includes("priority") ||
                                item.title.toLowerCase().includes("key") ||
                                item.title.toLowerCase().includes("metric")
                                  ? "Details:"
                                  : "Tips:"}
                              </h4>
                              <ul className="space-y-2">
                                {item.tips.map((tip, tipIndex) => (
                                  <li
                                    key={tipIndex}
                                    className="flex gap-3 text-sm"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </section>
                );
              })}

              {filteredSections.length === 0 && (
                <div className="text-center py-12">
                  <Book className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or browse all sections above.
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link
                  href="/features"
                  className="flex items-center gap-2 text-[#5e6c84] hover:text-primary transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  View Features
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 text-[#5e6c84] hover:text-primary transition-colors"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
