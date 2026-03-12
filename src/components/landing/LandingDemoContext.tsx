"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface DemoTask {
  id: string;
  column_id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string | null;
  assigned_to: string | null;
  position: number;
  created_by: string;
  date?: string;
}

export interface Column {
  id: string;
  name: string;
  color: string | null;
  position: number;
}

interface LandingDemoContextType {
  tasks: Record<string, DemoTask[]>;
  setTasks: (tasks: Record<string, DemoTask[]>) => void;
  columns: Column[];
  addTask: (task: DemoTask) => void;
  updateTask: (taskId: string, updates: Partial<DemoTask>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, sourceColumn: string, destColumn: string, newPosition: number) => void;
  getAllTasksWithDates: () => DemoTask[];
}

const LandingDemoContext = createContext<LandingDemoContextType | null>(null);

const DEMO_COLUMNS: Column[] = [
  { id: "todo", name: "To Do", color: "#6b778c", position: 1 },
  { id: "in-progress", name: "In Progress", color: "#0079bf", position: 2 },
  { id: "review", name: "Review", color: "#ff9f1a", position: 3 },
  { id: "done", name: "Done", color: "#61bd4f", position: 4 },
];

function getRelativeDate(daysFromToday: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function generateInitialTasks(): Record<string, DemoTask[]> {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const initialTasks: DemoTask[] = [
    {
      id: "task-1",
      column_id: "todo",
      title: "Design new dashboard layout",
      description: "Create mockups for the main dashboard",
      priority: "high",
      due_date: getRelativeDate(5),
      date: getRelativeDate(5),
      assigned_to: null,
      created_by: "demo-user",
      position: 1,
    },
    {
      id: "task-2",
      column_id: "todo",
      title: "Set up API endpoints",
      description: "Implement REST endpoints for task management",
      priority: "urgent",
      due_date: getRelativeDate(2),
      date: getRelativeDate(2),
      assigned_to: null,
      created_by: "demo-user",
      position: 2,
    },
    {
      id: "task-3",
      column_id: "in-progress",
      title: "Implement authentication",
      description: "Add user login and registration flows",
      priority: "high",
      due_date: getRelativeDate(4),
      date: getRelativeDate(4),
      assigned_to: null,
      created_by: "demo-user",
      position: 1,
    },
    {
      id: "task-4",
      column_id: "in-progress",
      title: "Build calendar view",
      description: "Create calendar component for deadline tracking",
      priority: "medium",
      due_date: getRelativeDate(6),
      date: getRelativeDate(6),
      assigned_to: null,
      created_by: "demo-user",
      position: 2,
    },
    {
      id: "task-5",
      column_id: "review",
      title: "Write documentation",
      description: "Complete API documentation",
      priority: "low",
      due_date: getRelativeDate(10),
      date: getRelativeDate(10),
      assigned_to: null,
      created_by: "demo-user",
      position: 1,
    },
    {
      id: "task-6",
      column_id: "done",
      title: "Setup project repository",
      description: "Initialize git repo and CI/CD",
      priority: "high",
      due_date: getRelativeDate(-2),
      date: getRelativeDate(-2),
      assigned_to: null,
      created_by: "demo-user",
      position: 1,
    },
    {
      id: "task-7",
      column_id: "done",
      title: "Create design system",
      description: "Design tokens and component library",
      priority: "medium",
      due_date: getRelativeDate(-1),
      date: getRelativeDate(-1),
      assigned_to: null,
      created_by: "demo-user",
      position: 2,
    },
  ];

  const grouped: Record<string, DemoTask[]> = {};
  DEMO_COLUMNS.forEach((col) => {
    grouped[col.id] = initialTasks
      .filter((t) => t.column_id === col.id)
      .sort((a, b) => a.position - b.position);
  });

  return grouped;
}

export function LandingDemoProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Record<string, DemoTask[]>>(generateInitialTasks);

  const addTask = useCallback((task: DemoTask) => {
    setTasks((prev) => ({
      ...prev,
      [task.column_id]: [...(prev[task.column_id] || []), task],
    }));
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<DemoTask>) => {
    setTasks((prev) => {
      const newTasks: Record<string, DemoTask[]> = {};
      
      for (const [columnId, columnTasks] of Object.entries(prev)) {
        newTasks[columnId] = columnTasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        );
      }
      
      return newTasks;
    });
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => {
      const newTasks: Record<string, DemoTask[]> = {};
      
      for (const [columnId, columnTasks] of Object.entries(prev)) {
        newTasks[columnId] = columnTasks.filter((task) => task.id !== taskId);
      }
      
      return newTasks;
    });
  }, []);

  const moveTask = useCallback(
    (taskId: string, sourceColumn: string, destColumn: string, newPosition: number) => {
      setTasks((prev) => {
        const sourceTasks = [...(prev[sourceColumn] || [])];
        const taskIndex = sourceTasks.findIndex((t) => t.id === taskId);
        
        if (taskIndex === -1) return prev;
        
        const [movedTask] = sourceTasks.splice(taskIndex, 1);
        movedTask.column_id = destColumn;
        movedTask.position = newPosition;
        
        const newTasks: Record<string, DemoTask[]> = {
          ...prev,
          [sourceColumn]: sourceTasks,
        };
        
        if (sourceColumn === destColumn) {
          sourceTasks.splice(newPosition, 0, movedTask);
          newTasks[sourceColumn] = sourceTasks.map((t, i) => ({ ...t, position: i + 1 }));
        } else {
          const destTasks = [...(prev[destColumn] || [])];
          destTasks.splice(newPosition, 0, movedTask);
          newTasks[destColumn] = destTasks.map((t, i) => ({ ...t, position: i + 1 }));
          newTasks[sourceColumn] = sourceTasks.map((t, i) => ({ ...t, position: i + 1 }));
        }
        
        return newTasks;
      });
    },
    []
  );

  const getAllTasksWithDates = useCallback(() => {
    const allTasks: DemoTask[] = [];
    Object.values(tasks).forEach((columnTasks) => {
      columnTasks.forEach((task) => {
        if (task.due_date) {
          allTasks.push(task);
        }
      });
    });
    return allTasks;
  }, [tasks]);

  return (
    <LandingDemoContext.Provider
      value={{
        tasks,
        setTasks,
        columns: DEMO_COLUMNS,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        getAllTasksWithDates,
      }}
    >
      {children}
    </LandingDemoContext.Provider>
  );
}

export function useLandingDemo() {
  const context = useContext(LandingDemoContext);
  if (!context) {
    throw new Error("useLandingDemo must be used within a LandingDemoProvider");
  }
  return context;
}
