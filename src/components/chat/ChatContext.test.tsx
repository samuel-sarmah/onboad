import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatProvider, useChat } from "./ChatContext";

function ChatConsumer() {
  const { messages, isOpen, isLoading, toggleChat, sendMessage } = useChat();

  return (
    <div>
      <button type="button" onClick={toggleChat}>
        Toggle Chat
      </button>
      <button type="button" onClick={() => sendMessage("Hello from test")}> 
        Send Test Message
      </button>
      <div data-testid="open-state">{isOpen ? "open" : "closed"}</div>
      <div data-testid="loading-state">{isLoading ? "loading" : "idle"}</div>
      <ul>
        {messages.map((message) => (
          <li key={message.id} data-testid={`msg-${message.role}`}>
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe("ChatProvider", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    global.fetch = jest.fn();
  });

  it("shows the default welcome assistant message", () => {
    render(
      <ChatProvider workspaceId="workspace-1">
        <ChatConsumer />
      </ChatProvider>
    );

    expect(
      screen.getByText(/Hi! I'm Onboard Assistant/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("open-state")).toHaveTextContent("closed");
  });

  it("toggles chat open state", async () => {
    const user = userEvent.setup();

    render(
      <ChatProvider workspaceId="workspace-1">
        <ChatConsumer />
      </ChatProvider>
    );

    await user.click(screen.getByRole("button", { name: "Toggle Chat" }));

    expect(screen.getByTestId("open-state")).toHaveTextContent("open");
  });

  it("sends a message and appends assistant reply", async () => {
    const user = userEvent.setup();
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "Test assistant reply" }),
    });

    render(
      <ChatProvider workspaceId="workspace-abc">
        <ChatConsumer />
      </ChatProvider>
    );

    await user.click(screen.getByRole("button", { name: "Send Test Message" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Hello from test",
          workspaceId: "workspace-abc",
        }),
      });
    });

    expect(screen.getByText("Hello from test")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Test assistant reply")).toBeInTheDocument();
    });
  });

  it("adds fallback error message when API returns non-ok response", async () => {
    const user = userEvent.setup();
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "failure" }),
    });

    render(
      <ChatProvider workspaceId="workspace-1">
        <ChatConsumer />
      </ChatProvider>
    );

    await user.click(screen.getByRole("button", { name: "Send Test Message" }));

    await waitFor(() => {
      expect(
        screen.getByText("Sorry, I couldn't process your request. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
