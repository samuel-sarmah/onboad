import { Card } from "@/components/ui";
import { 
  LayoutGrid, 
  Calendar, 
  Users, 
  BarChart3, 
  Bell, 
  CheckSquare,
  MessageSquare,
  Shield
} from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Kanban Boards",
    description: "Visualize your workflow with customizable boards and drag-drop task management."
  },
  {
    icon: Calendar,
    title: "Calendar View",
    description: "Track deadlines and schedules with an integrated calendar view."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Assign tasks, share updates, and keep everyone on the same page."
  },
  {
    icon: BarChart3,
    title: "Progress Reports",
    description: "Track team velocity and project progress with detailed analytics."
  },
  {
    icon: CheckSquare,
    title: "Subtasks",
    description: "Break down complex tasks into manageable subtasks."
  },
  {
    icon: MessageSquare,
    title: "Comments & Mentions",
    description: "Discuss tasks in real-time with @mentions and thread comments."
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Stay informed with instant notifications for updates and deadlines."
  },
  {
    icon: Shield,
    title: "Roles & Permissions",
    description: "Control access with customizable roles: Admin, Manager, Member, or Viewer."
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Everything you need to ship
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Powerful features designed for small teams who want to move fast.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:border-border-dark transition-colors">
              <div className="w-10 h-10 bg-primary/5 rounded flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
