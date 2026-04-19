/** @jest-environment node */

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(),
}));

import { GET } from "./route";
import { createClient } from "@/lib/supabase/server";

const getUserMock = jest.fn();
const createClientMock = createClient as jest.Mock;

describe("GET /api/auth/me", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock,
      },
    });
  });

  it("returns 401 when no authenticated user exists", async () => {
    getUserMock.mockResolvedValue({ data: { user: null }, error: null });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data).toEqual({ user: null });
  });

  it("returns normalized user fields when authenticated", async () => {
    getUserMock.mockResolvedValue({
      data: {
        user: {
          id: "user-1",
          email: "user@example.com",
          user_metadata: { name: "Test User" },
        },
      },
      error: null,
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      user: {
        id: "user-1",
        email: "user@example.com",
        name: "Test User",
      },
    });
  });
});
