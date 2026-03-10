"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  priority: "low" | "medium" | "high" | "urgent";
}

interface CalendarViewProps {
  events: CalendarEvent[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const priorityColors = {
  low: "bg-gray-100 border-gray-200",
  medium: "bg-blue-100 border-blue-200",
  high: "bg-yellow-100 border-yellow-200",
  urgent: "bg-red-100 border-red-200",
};

export function CalendarView({ events }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const getEventsForDay = (day: number) => {
    const date = new Date(year, month, day);
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 md:mb-6">
        <h2 className="text-base md:text-xl font-semibold">
          {MONTHS[month]} {year}
        </h2>
        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="w-3 md:w-4 h-3 md:h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-border flex-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="bg-secondary/30 p-1 md:p-2 text-center text-xs md:text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          const isToday = day === new Date().getDate() && 
            month === new Date().getMonth() && 
            year === new Date().getFullYear();
          const isSelected = selectedDate && day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear();

          return (
            <div
              key={index}
              className={`bg-white min-h-[60px] md:min-h-[100px] p-0.5 md:p-1 ${
                day ? "cursor-pointer hover:bg-secondary/20" : "bg-secondary/30"
              } ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
              onClick={() => day && setSelectedDate(new Date(year, month, day))}
            >
              {day && (
                <>
                  <div className={`text-xs md:text-sm mb-0.5 md:mb-1 ${isToday ? "font-bold text-primary" : "text-gray-600"}`}>
                    {day}
                    {isToday && (
                      <span className="ml-0.5 md:ml-1 w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full inline-block" />
                    )}
                  </div>
                  <div className="space-y-0.5 md:space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-[10px] md:text-xs p-0.5 md:p-1 rounded border ${priorityColors[event.priority]} truncate`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] md:text-xs text-gray-500 text-center hidden md:block">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                    {dayEvents.length > 2 && (
                      <div className="md:hidden text-[10px] text-gray-500 text-center">
                        +{dayEvents.length - 2}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
