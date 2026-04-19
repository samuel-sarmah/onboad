/** @jest-environment node */

const getGenerativeModelMock = jest.fn();
const getUserMock = jest.fn();
const fromMock = jest.fn();

jest.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: getGenerativeModelMock,
  })),
}));

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(),
}));

import { POST } from "./route";
import { createClient } from "@/lib/supabase/server";

const createClientMock = createClient as jest.Mock;

function mockRequest(body: unknown) {
  return {
    json: async () => body,
  } as Request;
}

describe("POST /api/chat", () => {
  const previousApiKey = process.env.GEMINI_API_KEY;
  const previousModel = process.env.GEMINI_MODEL;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GEMINI_API_KEY = "test-api-key";
    delete process.env.GEMINI_MODEL;

    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock,
      },
      from: fromMock,
    });

    getUserMock.mockResolvedValue({
      data: { user: { id: "user-1" } },
      error: null,
    });

    fromMock.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({ data: { workspace_id: "ws-1" }, error: null }),
          }),
        }),
      }),
    });
  });

  afterAll(() => {
    process.env.GEMINI_API_KEY = previousApiKey;
    process.env.GEMINI_MODEL = previousModel;
  });

  it("returns 400 when message is missing", async () => {
    const response = await POST(mockRequest({ workspaceId: "workspace-1" }) as never);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Message is required");
  });

  it("uses fallback model when primary model fails", async () => {
    getGenerativeModelMock.mockImplementation(({ model }: { model: string }) => {
      if (model === "gemini-2.0-flash") {
        return {
          generateContent: jest
            .fn()
            .mockRejectedValue(new Error("Model not available")),
        };
      }

      if (model === "gemini-1.5-flash-latest") {
        return {
          generateContent: jest.fn().mockResolvedValue({
            response: {
              text: () => "Fallback model reply",
            },
          }),
        };
      }

      return {
        generateContent: jest.fn().mockRejectedValue(new Error("Unexpected model")),
      };
    });

    const response = await POST(mockRequest({ message: "Hello" }) as never);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.reply).toBe("Fallback model reply");
    expect(getGenerativeModelMock).toHaveBeenNthCalledWith(1, {
      model: "gemini-2.0-flash",
    });
    expect(getGenerativeModelMock).toHaveBeenNthCalledWith(2, {
      model: "gemini-1.5-flash-latest",
    });
    expect(createClientMock).toHaveBeenCalledTimes(1);
  });

  it("returns 401 when user is not authenticated", async () => {
    getUserMock.mockResolvedValue({ data: { user: null }, error: null });

    const response = await POST(mockRequest({ message: "Hello" }) as never);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("returns 403 when workspace is not accessible to the user", async () => {
    const maybeSingle = jest.fn().mockResolvedValue({ data: null, error: null });
    const secondEq = jest.fn().mockReturnValue({ maybeSingle });
    const firstEq = jest.fn().mockReturnValue({ eq: secondEq });
    const select = jest.fn().mockReturnValue({ eq: firstEq });
    fromMock.mockReturnValue({ select });

    const response = await POST(
      mockRequest({ message: "Hello", workspaceId: "ws-denied" }) as never
    );
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.error).toBe("Forbidden");
  });

  it("returns 500 with helpful error if all configured models fail", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    getGenerativeModelMock.mockReturnValue({
      generateContent: jest.fn().mockRejectedValue(new Error("All failed")),
    });

    const response = await POST(mockRequest({ message: "Hello" }) as never);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toMatch(/No supported Gemini model is available/i);

    consoleSpy.mockRestore();
  });
});
