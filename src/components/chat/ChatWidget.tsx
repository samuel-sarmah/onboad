"use client";

import { useChat } from "./ChatContext";
import { ChatWindow } from "./ChatWindow";
import { MessageCircle } from "lucide-react";

export function ChatWidget() {
  const { isOpen, toggleChat } = useChat();

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[60]">
      {!isOpen && (
        <div className="relative flex flex-col items-end gap-2">
          <span className="hidden md:inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-lg border border-white/30">
            AI Assistant
          </span>

          <button
            onClick={toggleChat}
            className="relative w-16 h-16 md:w-[72px] md:h-[72px] bg-primary hover:bg-primary-hover text-white rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.35)] ring-4 ring-white flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
            aria-label="Open chat assistant"
          >
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
            <MessageCircle className="relative w-7 h-7" />
          </button>
        </div>
      )}
      {isOpen && <ChatWindow />}
    </div>
  );
}
