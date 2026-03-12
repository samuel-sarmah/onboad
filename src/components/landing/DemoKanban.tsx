"use client";

import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanColumn } from "@/components/kanban";
import { Button, Input, Textarea, Badge } from "@/components/ui";
import { X, Calendar, Flag, Trash2, Edit2, Plus } from "lucide-react";

interface Task {
  id: string;
  column_id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string | null;
  assigned_to: string | null;
  position: number;
  created_by: string;
}

interface Column {
  id: string;
  name: string;
  color: string | null;
  position: number;
}

const DEMO_COLUMNS: Column[] = [
  { id: "todo", name: "To Do", color: "#6b7280", position: 1 },
  { id: "in-progress", name: "In Progress", color: "#2563eb", position: 2 },
  { id: "review", name: "Review", color: "#ca8a04", position: 3 },
  { id: "done", name: "Done", color: "#16a34a", position: 4 },
];

const DEMO_TASKS: Task[] = [
  {
    id: "task-1",
    column_id: "todo",
    title: "Design new dashboard layout",
    description: "Create mockups for the main dashboard",
    priority: "high",
    due_date: "2025-03-15",
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
    due_date: "2025-03-10",
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
    due_date: "2025-03-12",
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
    due_date: "2025-03-14",
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
    due_date: "2025-03-20",
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
    due_date: "2025-03-08",
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
    due_date: "2025-03-09",
    assigned_to: null,
    created_by: "demo-user",
    position: 2,
  },
];

export function DemoKanban() {
  const [columns] = useState<Column[]>(DEMO_COLUMNS);
  const [tasks, setTasks] = useState<Record<string, Task[]>>(() => {
    const grouped: Record<string, Task[]> = {};
    DEMO_COLUMNS.forEach((col) => {
      grouped[col.id] = DEMO_TASKS.filter((t) => t.column_id === col.id).sort(
        (a, b) => a.position - b.position
      );
    });
    return grouped;
  });

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Task>>({});
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState<string>("todo");
  const [newTaskFromColumn, setNewTaskFromColumn] = useState<boolean>(false);
  const [newTaskForm, setNewTaskForm] = useState<{
    title: string;
    description: string;
    priority: "low" | "medium" | "high" | "urgent";
    due_date: string;
  }>({
    title: "",
    description: "",
    priority: "medium",
    due_date: "",
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const sourceTasks = [...(tasks[sourceColumn] || [])];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColumn === destColumn) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks({
        ...tasks,
        [sourceColumn]: sourceTasks,
      });
    } else {
      const destTasks = [...(tasks[destColumn] || [])];
      destTasks.splice(destination.index, 0, movedTask);
      movedTask.column_id = destColumn;
      setTasks({
        ...tasks,
        [sourceColumn]: sourceTasks,
        [destColumn]: destTasks,
      });
    }
  };

  const handleAddTask = () => {
    if (!newTaskForm.title.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      column_id: newTaskColumn,
      title: newTaskForm.title,
      description: newTaskForm.description || null,
      priority: newTaskForm.priority,
      due_date: newTaskForm.due_date || null,
      assigned_to: null,
      created_by: "demo-user",
      position: (tasks[newTaskColumn]?.length || 0) + 1,
    };

    setTasks({
      ...tasks,
      [newTaskColumn]: [...(tasks[newTaskColumn] || []), newTask],
    });

    setNewTaskForm({ title: "", description: "", priority: "medium", due_date: "" });
    setShowNewTaskForm(false);
  };

  const handleEditTask = () => {
    if (!selectedTask || !editForm.title?.trim()) return;

    const columnId = editForm.column_id || selectedTask.column_id;
    const updatedTask: Task = {
      ...selectedTask,
      ...editForm,
      column_id: columnId,
    };

    // If column changed, move to new column
    if (editForm.column_id && editForm.column_id !== selectedTask.column_id) {
      const sourceTasks = tasks[selectedTask.column_id]?.filter(
        (t) => t.id !== selectedTask.id
      ) || [];
      const destTasks = [...(tasks[columnId] || []), updatedTask];

      setTasks({
        ...tasks,
        [selectedTask.column_id]: sourceTasks,
        [columnId]: destTasks,
      });
    } else {
      // Update in same column
      const columnTasks = tasks[columnId]?.map((t) =>
        t.id === selectedTask.id ? updatedTask : t
      ) || [];

      setTasks({
        ...tasks,
        [columnId]: columnTasks,
      });
    }

    setSelectedTask(updatedTask);
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    if (!selectedTask) return;

    const columnId = selectedTask.column_id;
    const columnTasks = tasks[columnId]?.filter((t) => t.id !== selectedTask.id) || [];

    setTasks({
      ...tasks,
      [columnId]: columnTasks,
    });

    setSelectedTask(null);
  };

  const openEditModal = () => {
    if (selectedTask) {
      setEditForm({ ...selectedTask });
      setIsEditing(true);
    }
  };

  return (
    <section className="py-6 md:py-10 px-3 md:px-4 bg-[#f4f5f7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#172b4d] mb-3 md:mb-4">
            Kanban boards that just work
          </h2>
          <p className="text-[#5e6c84] max-w-lg mx-auto text-sm md:text-base">
            Visualize your workflow with customizable columns. Drag and drop tasks to update status instantly.
          </p>
        </div>

        <div className="bg-[#0079bf] rounded-xl p-3 md:p-6 shadow-lg">
          <div className="mb-3 md:mb-4 flex justify-end">
            <Button
              size="sm"
              onClick={() => {
                setNewTaskColumn("todo");
                setNewTaskFromColumn(false);
                setShowNewTaskForm(true);
                setNewTaskForm({ title: "", description: "", priority: "medium", due_date: "" });
              }}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max">
                {columns.map((column) => (
                  <KanbanColumn
                    key={column.id}
                    column={column}
                    tasks={tasks[column.id] || []}
                    onTaskClick={setSelectedTask}
                    lightText={true}
                    onAddTask={() => {
                      setNewTaskColumn(column.id);
                      setNewTaskFromColumn(true);
                      setShowNewTaskForm(true);
                      setNewTaskForm({ title: "", description: "", priority: "medium", due_date: "" });
                    }}
                  />
                ))}
              </div>
            </div>
          </DragDropContext>
        </div>

        <div className="mt-3 text-center">
          <Button size="lg">
            Start Free Trial - Try Full Features
          </Button>
        </div>
      </div>

      {/* Add New Task Modal */}
      {showNewTaskForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Add New Task</h3>
              <button
                onClick={() => setShowNewTaskForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {newTaskFromColumn ? (
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Column
                  </label>
                  <div className="px-3 py-2 border border-border rounded text-sm bg-secondary text-gray-600">
                    {columns.find(c => c.id === newTaskColumn)?.name}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Column
                  </label>
                  <select
                    value={newTaskColumn}
                    onChange={(e) => setNewTaskColumn(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {columns.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Title *
                </label>
                <Input
                  value={newTaskForm.title}
                  onChange={(e) =>
                    setNewTaskForm({ ...newTaskForm, title: e.target.value })
                  }
                  placeholder="Task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Description
                </label>
                <Textarea
                  value={newTaskForm.description}
                  onChange={(e) =>
                    setNewTaskForm({ ...newTaskForm, description: e.target.value })
                  }
                  placeholder="Task description"
                  className="h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Priority
                </label>
                <select
                  value={newTaskForm.priority}
                  onChange={(e) =>
                    setNewTaskForm({
                      ...newTaskForm,
                      priority: e.target.value as Task["priority"],
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={newTaskForm.due_date}
                  onChange={(e) =>
                    setNewTaskForm({ ...newTaskForm, due_date: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowNewTaskForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleAddTask} className="flex-1">
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View/Edit Task Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              {!isEditing ? (
                <>
                  <h3 className="text-lg font-semibold text-primary">
                    {selectedTask.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={openEditModal}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit task"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDeleteTask}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedTask(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-primary">Edit Task</h3>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {!isEditing ? (
              <>
                {selectedTask.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedTask.description}
                  </p>
                )}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-gray-400" />
                    <Badge
                      variant={
                        ({
                          low: "default",
                          medium: "info",
                          high: "warning",
                          urgent: "error",
                        } as const)[selectedTask.priority]
                      }
                    >
                      {selectedTask.priority}
                    </Badge>
                  </div>
                  {selectedTask.due_date && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>
                        {new Date(selectedTask.due_date).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 pt-2">
                    Column: {columns.find((c) => c.id === selectedTask.column_id)?.name}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Column
                  </label>
                  <select
                    value={editForm.column_id || selectedTask.column_id}
                    onChange={(e) =>
                      setEditForm({ ...editForm, column_id: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {columns.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Title
                  </label>
                  <Input
                    value={editForm.title || selectedTask.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Description
                  </label>
                  <Textarea
                    value={editForm.description ?? selectedTask.description ?? ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="h-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Priority
                  </label>
                  <select
                    value={editForm.priority || selectedTask.priority}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        priority: e.target.value as Task["priority"],
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    value={editForm.due_date ?? selectedTask.due_date ?? ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, due_date: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleEditTask} className="flex-1">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
