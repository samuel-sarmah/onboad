"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";

interface NotificationContextProviderProps {
  children: ReactNode;
}

export function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        expand={false}
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "#ffffff",
            border: "1px solid #e5e7eb",
          },
        }}
      />
    </>
  );
}
