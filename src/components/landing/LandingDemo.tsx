"use client";

import { LandingDemoProvider } from "./LandingDemoContext";
import { DemoKanban } from "./DemoKanban";
import { CalendarDemo } from "./CalendarDemo";

export function LandingDemo() {
  return (
    <LandingDemoProvider>
      <DemoKanban />
      <CalendarDemo />
    </LandingDemoProvider>
  );
}
