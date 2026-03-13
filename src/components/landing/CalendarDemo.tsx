"use client";

import { useState, useEffect } from "react";
import { Button, Input, Textarea, Badge } from "@/components/ui";
import { useLandingDemo, DemoTask } from "./LandingDemoContext";
import { X, ChevronLeft, ChevronRight, Plus, Trash2, Calendar as CalendarIcon, Edit2 } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const priorityColors = {
  low: { bg: "bg-slate-100", border: "border-slate-300", text: "text-slate-700" },
  medium: { bg: "bg-blue-100", border: "border-blue-300", text: "text-blue-700" },
  high: { bg: "bg-amber-100", border: "border-amber-300", text: "text-amber-700" },
  urgent: { bg: "bg-red-100", border: "border-red-300", text: "text-red-700" },
};

const priorityDotColors = {
  low: "bg-slate-400",
  medium: "bg-blue-500",
  high: "bg-amber-500",
  urgent: "bg-red-500",
};

const TEAM_MEMBERS = ["Sarah", "John", "Maya", "Alex", "Engineering", "Design Team", "Team", "Leadership", "Finance"];

export function CalendarDemo() {
  const { tasks, addTask, updateTask, deleteTask } = useLandingDemo();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allTasks, setAllTasks] = useState<DemoTask[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<DemoTask | null>(null);
  const [editingTask, setEditingTask] = useState<DemoTask | null>(null);
  const [editForm, setEditForm] = useState<Partial<DemoTask>>({});
  const [editingFromForm, setEditingFromForm] = useState<DemoTask | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    assignee: "Team",
    date: new Date(),
  });

  useEffect(() => {
    const tasksWithDates: DemoTask[] = [];
    Object.values(tasks).forEach((columnTasks) => {
      columnTasks.forEach((task) => {
        if (task.due_date) {
          tasksWithDates.push(task);
        }
      });
    });
    setAllTasks(tasksWithDates);
  }, [tasks]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getTasksForDate = (day: number) => {
    const dateStr = formatDate(new Date(year, month, day));
    return allTasks.filter((task) => task.due_date === dateStr);
  };

  const handleAddTask = () => {
    if (!formData.title.trim()) return;

    if (!isFutureDate(formData.date)) {
      return;
    }

    if (editingFromForm) {
      updateTask(editingFromForm.id, {
        title: formData.title,
        description: formData.description || null,
        due_date: formatDate(formData.date),
        date: formatDate(formData.date),
        assigned_to: formData.assignee,
        priority: formData.priority,
      });
    } else {
      const newTask: DemoTask = {
        id: `cal-task-${Date.now()}`,
        column_id: "todo",
        title: formData.title,
        description: formData.description || null,
        priority: formData.priority,
        due_date: formatDate(formData.date),
        date: formatDate(formData.date),
        assigned_to: formData.assignee,
        created_by: "demo-user",
        position: 1,
      };
      addTask(newTask);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", priority: "medium", assignee: "Team", date: new Date() });
    setSelectedDate(null);
    setShowForm(false);
    setEditingFromForm(null);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setSelectedTask(null);
  };

  const handleUpdateTask = (updatedTask: DemoTask) => {
    updateTask(updatedTask.id, {
      title: updatedTask.title,
      description: updatedTask.description,
      due_date: updatedTask.due_date,
      date: updatedTask.due_date || undefined,
      priority: updatedTask.priority,
      assigned_to: updatedTask.assigned_to,
    });
    setSelectedTask(updatedTask);
    setEditingTask(null);
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate >= today;
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);

    if (!isFutureDate(newDate)) {
      return;
    }

    const dateStr = formatDate(newDate);
    const existingTaskOnDate = allTasks.find((task) => task.due_date === dateStr);

    setSelectedDate(newDate);

    if (existingTaskOnDate) {
      setEditingFromForm(existingTaskOnDate);
      setFormData({
        title: existingTaskOnDate.title,
        description: existingTaskOnDate.description || "",
        priority: existingTaskOnDate.priority as any,
        assignee: existingTaskOnDate.assigned_to || "Team",
        date: newDate,
      });
    } else {
      setEditingFromForm(null);
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        assignee: "Team",
        date: newDate,
      });
    }
    setShowForm(true);
  };

  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <section className="w-full py-6 md:py-10 px-3 md:px-4 bg-[#f4f5f7]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#172b4d] mb-3 md:mb-4">
            Never miss a deadline
          </h2>
          <p className="text-sm md:text-base text-[#5e6c84]">
            See all your tasks in a calendar view. Plan ahead and keep your team on track.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-[#dfe1e6] shadow-sm p-3 md:p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">
                {MONTHS[month]} {year}
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-semibold text-gray-700 bg-gray-100 rounded"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 bg-gray-50 p-2 rounded-lg">
              {days.map((day, index) => {
                const dayTasks = day ? getTasksForDate(day) : [];
                const isToday = day === new Date().getDate() && 
                  month === new Date().getMonth() && 
                  year === new Date().getFullYear();
                const isSelected = selectedDate && day === selectedDate.getDate() &&
                  selectedDate.getMonth() === month &&
                  selectedDate.getFullYear() === year;

                return (
                  <div
                    key={index}
                    onClick={() => day && handleDateClick(day)}
                    className={`min-h-[3.5rem] md:aspect-square p-1 md:p-2 rounded border-2 flex flex-col overflow-hidden transition-all ${
                      day ? (
                        isFutureDate(new Date(year, month, day))
                          ? "bg-white hover:bg-blue-50 cursor-pointer"
                          : "bg-gray-100 cursor-not-allowed opacity-50"
                      ) : "bg-gray-200"
                    } ${isSelected ? "border-primary ring-2 ring-primary ring-offset-1" : "border-gray-200"} ${
                      isToday ? "border-primary bg-blue-50" : ""
                    }`}
                  >
                    {day && (
                      <>
                        <div className={`text-xs font-semibold mb-1 flex items-center gap-1 flex-shrink-0 ${
                          isToday ? "text-primary" : "text-gray-700"
                        }`}>
                          {day}
                          {isToday && (
                            <span className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <div className="space-y-0.5 overflow-y-auto flex-1 min-h-0">
                          {dayTasks.length > 0 && (
                            <>
                              <div className="hidden md:block">
                                {dayTasks.slice(0, 2).map((task) => (
                                  <div
                                    key={task.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedTask(task);
                                    }}
                                    className={`text-xs p-1 rounded border ${priorityColors[task.priority].bg} ${priorityColors[task.priority].border} border-l-2 truncate cursor-pointer hover:shadow-md transition-shadow flex items-start gap-1`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5 ${priorityDotColors[task.priority]}`} />
                                    <span className="truncate flex-1">{task.title}</span>
                                  </div>
                                ))}
                                {dayTasks.length > 2 && (
                                  <div className="text-xs text-gray-600 px-1 font-medium">
                                    +{dayTasks.length - 2} more
                                  </div>
                                )}
                              </div>
                              <div className="md:hidden flex flex-wrap gap-1">
                                {dayTasks.slice(0, 3).map((task) => (
                                  <span
                                    key={task.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedTask(task);
                                    }}
                                    className={`inline-flex w-2 h-2 rounded-full ${priorityDotColors[task.priority]} cursor-pointer`}
                                    title={task.title}
                                  />
                                ))}
                                {dayTasks.length > 3 && (
                                  <span className="text-[10px] text-gray-500 font-medium">
                                    +{dayTasks.length - 3}
                                  </span>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Desktop: Persistent Add Task Form */}
            <div className="hidden lg:block bg-white rounded-lg border border-border shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  {editingFromForm ? "Edit Task" : "Add Task"}
                </h4>
                {editingFromForm && (
                  <button
                    onClick={() => resetForm()}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task title
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter task name..."
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formatDate(formData.date)}
                    onChange={(e) => {
                      const [y, m, d] = e.target.value.split("-").map(Number);
                      setFormData({ ...formData, date: new Date(y, m - 1, d) });
                    }}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {!isFutureDate(formData.date) && (
                    <p className="text-xs text-red-600 mt-1">Please select a date today or in the future</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add task details..."
                    className="w-full text-sm"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign to
                  </label>
                  <select
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {TEAM_MEMBERS.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleAddTask}
                  className="w-full"
                  disabled={!formData.title.trim() || !isFutureDate(formData.date)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {editingFromForm ? "Save Changes" : "Add Task"}
                </Button>

                {editingFromForm && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleDeleteTask(editingFromForm.id);
                      resetForm();
                    }}
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Task
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile: Conditional Forms */}
            {/* Add Task Form (Mobile) */}
            {selectedDate && (
              <div className="lg:hidden bg-white rounded-lg border border-border shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </h4>
                  <button
                    onClick={() => {
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {showForm ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Task title
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Add a task..."
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Add details..."
                        className="w-full text-sm"
                        rows={2}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assign to
                      </label>
                      <select
                        value={formData.assignee}
                        onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {TEAM_MEMBERS.map((member) => (
                          <option key={member} value={member}>
                            {member}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={handleAddTask}
                        className="flex-1"
                        disabled={!formData.title.trim() || !isFutureDate(formData.date)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {editingFromForm ? "Save Changes" : "Add Task"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          resetForm();
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setShowForm(true)}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary hover:bg-blue-50 transition-all"
                  >
                    <Plus className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to add a task</p>
                  </div>
                )}

                {/* Tasks for Selected Date */}
                <div className="mt-6 pt-6 border-t">
                  <h5 className="font-semibold text-sm mb-3">Tasks on this day:</h5>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedDate && getTasksForDate(selectedDate.getDate()).length > 0 ? (
                      getTasksForDate(selectedDate.getDate()).map((task) => (
                        <div
                          key={task.id}
                          onClick={() => {
                            setFormData({
                              title: task.title,
                              description: task.description || "",
                              priority: task.priority as any,
                              assignee: task.assigned_to || "Team",
                              date: new Date(task.due_date!),
                            });
                            setEditingFromForm(task);
                            setShowForm(true);
                          }}
                          className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all ${priorityColors[task.priority].bg} ${priorityColors[task.priority].border} hover:shadow-md`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {task.title}
                              </p>
                              {task.assigned_to && (
                                <p className="text-xs text-gray-600 mt-1">
                                  {task.assigned_to}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTask(task.id);
                              }}
                              className="text-gray-400 hover:text-red-600 flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No tasks scheduled</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Task Detail (Mobile) */}
            {selectedTask && !editingTask && (
              <div className="lg:hidden bg-white rounded-lg border border-border shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-lg flex-1">{selectedTask.title}</h4>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {selectedTask.description && (
                  <p className="text-sm text-gray-600 mb-4">{selectedTask.description}</p>
                )}

                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Priority
                    </label>
                    <Badge className={`mt-1 ${priorityColors[selectedTask.priority].bg} ${priorityColors[selectedTask.priority].text} border-0`}>
                      {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                    </Badge>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Assigned to
                    </label>
                    <p className="text-sm text-gray-700 mt-1">{selectedTask.assigned_to || "Unassigned"}</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Date
                    </label>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedTask.due_date && new Date(selectedTask.due_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditForm({ ...selectedTask });
                      setEditingTask(selectedTask);
                    }}
                    className="flex-1"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTask(selectedTask.id)}
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}

            {/* Edit Task (Mobile) */}
            {editingTask && (
              <div className="lg:hidden bg-white rounded-lg border border-border shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-lg">Edit Task</h4>
                  <button
                    onClick={() => {
                      setEditingTask(null);
                      setEditForm({});
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task title
                    </label>
                    <Input
                      value={editForm.title || ""}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Task title"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      value={editForm.description || ""}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="Add details..."
                      className="w-full text-sm"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={editForm.priority || "medium"}
                      onChange={(e) => setEditForm({ ...editForm, priority: e.target.value as any })}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assign to
                    </label>
                    <select
                      value={editForm.assigned_to || "Team"}
                      onChange={(e) => setEditForm({ ...editForm, assigned_to: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {TEAM_MEMBERS.map((member) => (
                        <option key={member} value={member}>
                          {member}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => {
                        if (editForm.title) {
                          handleUpdateTask({
                            id: editingTask.id,
                            title: editForm.title,
                            description: editForm.description || null,
                            due_date: editingTask.due_date,
                            date: editingTask.due_date || undefined,
                            priority: editForm.priority || "medium",
                            assigned_to: editForm.assigned_to || null,
                            column_id: editingTask.column_id,
                            position: editingTask.position,
                            created_by: editingTask.created_by,
                          });
                        }
                      }}
                      className="flex-1"
                      disabled={!editForm.title?.trim()}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingTask(null);
                        setEditForm({});
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
