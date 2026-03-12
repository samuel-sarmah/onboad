"use client";

import { LandingDemoProvider } from "./LandingDemoContext";
import { DemoKanban } from "./DemoKanban";
import { CalendarDemo } from "./CalendarDemo";
import { BrandBackground } from "./BrandBackground";

export function LandingDemo() {
  return (
    <LandingDemoProvider>
      <div className="relative">
        <BrandBackground />
        <DemoKanban />
      </div>
      <div className="relative">
        <BrandBackground />
        <CalendarDemo />
      </div>
    </LandingDemoProvider>
  );
}
