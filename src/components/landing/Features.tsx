import { Card } from "@/components/ui";
import { 
  LayoutGrid, 
  Calendar, 
  Users, 
  BarChart3, 
  Bell, 
  CheckSquare,
  MessageSquare,
  Zap,
  Clock,
  Shield
} from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Kanban Boards",
    description: "Visualize your workflow with customizable boards. Drag and drop tasks between columns to track progress at a glance."
  },
  {
    icon: Calendar,
    title: "Calendar View",
    description: "See all your deadlines in one place. Sync due dates and plan your team's schedule with an integrated calendar."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly. Assign tasks, share updates, and keep everyone aligned on project goals."
  },
  {
    icon: BarChart3,
    title: "Progress Reports",
    description: "Track team velocity and project progress with built-in analytics. Make data-driven decisions."
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Stay informed with instant notifications for task updates, comments, and approaching deadlines."
  },
  {
    icon: Shield,
    title: "Roles & Permissions",
    description: "Control access with customizable roles. Choose from Admin, Manager, Member, or Viewer permissions."
  }
];

export function Features() {
  return (
    <section id="features" className="py-6 md:py-16 px-3 md:px-4 bg-[#f4f5f7]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#172b4d] mb-4">
            Everything your team needs to ship faster
          </h2>
          <p className="text-[#5e6c84] max-w-lg mx-auto">
            Powerful features designed for small teams who want to get things done.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-[#dfe1e6]">
              <div className="w-12 h-12 bg-[#0079bf] rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#172b4d] mb-2 text-lg">{feature.title}</h3>
              <p className="text-sm text-[#5e6c84] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
