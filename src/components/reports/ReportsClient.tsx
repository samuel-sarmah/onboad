"use client";

import { Card } from "@/components/ui";
import { BarChart3, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

interface ProjectStats {
  id: string;
  name: string;
  total: number;
  completed: number;
}

interface ReportsClientProps {
  taskStats: TaskStats;
  projectStats: ProjectStats[];
}

export function ReportsClient({ taskStats, projectStats }: ReportsClientProps) {
  const completionRate = taskStats.total > 0 
    ? Math.round((taskStats.completed / taskStats.total) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{taskStats.total}</p>
              <p className="text-sm text-gray-500">Total Tasks</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{taskStats.completed}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-info/10 rounded flex items-center justify-center">
              <Clock className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold">{taskStats.inProgress}</p>
              <p className="text-sm text-gray-500">In Progress</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error/10 rounded flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-error" />
            </div>
            <div>
              <p className="text-2xl font-bold">{taskStats.overdue}</p>
              <p className="text-sm text-gray-500">Overdue</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Overall Progress</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="12"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="12"
                  strokeDasharray={`${completionRate * 3.77} 377`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold">{completionRate}%</span>
                <span className="text-sm text-gray-500">Complete</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Project Progress</h3>
          <div className="space-y-4">
            {projectStats.map((project) => {
              const progress = project.total > 0 
                ? Math.round((project.completed / project.total) * 100) 
                : 0;
              
              return (
                <div key={project.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{project.name}</span>
                    <span className="text-sm text-gray-500">
                      {project.completed}/{project.total}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
            
            {projectStats.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No projects yet
              </p>
            )}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Task Distribution by Priority</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Urgent", color: "bg-error", count: 0 },
            { label: "High", color: "bg-warning", count: 0 },
            { label: "Medium", color: "bg-info", count: 0 },
            { label: "Low", color: "bg-gray-400", count: 0 },
          ].map((priority) => (
            <div key={priority.label} className="text-center">
              <div className={`h-3 w-full ${priority.color} rounded mb-2`} />
              <p className="text-sm font-medium">{priority.label}</p>
              <p className="text-2xl font-bold">{priority.count}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
