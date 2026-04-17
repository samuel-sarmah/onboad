import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_GEMINI_MODELS = [
  process.env.GEMINI_MODEL,
  "gemini-2.0-flash",
  "gemini-1.5-flash-latest",
].filter((model): model is string => Boolean(model));

const SYSTEM_PROMPT = `You are Onboard Assistant, an AI-powered helper for the Onboard project management platform. You help users manage their workspaces efficiently.

About Onboard:
- A project management tool for small teams
- Features: Kanban boards, Calendar views, Team management, Real-time collaboration
- Built with Supabase for authentication and database
- Uses a Kanban-style workflow with columns like "To Do", "In Progress", "Done"
- Tasks have: title, description, priority (low/medium/high/urgent), due date, assignee
- Workspaces contain projects, and projects contain columns with tasks

Your role:
- Help users understand their workspace data
- Answer questions about projects, tasks, team members
- Suggest actions to improve productivity
- Provide concise, actionable responses
- Be friendly and professional

Guidelines:
- Keep responses concise (2-3 sentences unless detailed explanation needed)
- Focus on actionable advice
- If data is unavailable, say so clearly
- Help users navigate the platform if they're confused`;

interface TaskData {
  title: string;
  priority: string;
  due_date: string | null;
  assigned_to: string | null;
}

interface ColumnData {
  name: string;
  tasks: TaskData[];
}

interface ProjectData {
  name: string;
  description: string | null;
  columns: ColumnData[];
}

interface WorkspaceContext {
  workspaceName: string;
  projects: ProjectData[];
  members: Array<{
    name: string | null;
    email: string;
    role: string;
  }>;
}

async function getWorkspaceContext(supabase: Awaited<ReturnType<typeof createClient>>, workspaceId: string): Promise<WorkspaceContext | null> {
  const { data: workspace } = await supabase
    .from("workspaces")
    .select("name")
    .eq("id", workspaceId)
    .single();

  if (!workspace) return null;

  const { data: projectsRaw } = await supabase
    .from("projects")
    .select(`
      name,
      description,
      columns (
        name,
        tasks (
          title,
          priority,
          due_date,
          assigned_to
        )
      )
    `)
    .eq("workspace_id", workspaceId);

  const formattedProjects: ProjectData[] = (projectsRaw || []).map((p) => ({
    name: p.name,
    description: p.description,
    columns: (p.columns || []).map((c) => ({
      name: c.name,
      tasks: (c.tasks || []).map((t) => ({
        title: t.title,
        priority: t.priority,
        due_date: t.due_date,
        assigned_to: t.assigned_to,
      })),
    })),
  }));

  const { data: members } = await supabase
    .from("workspace_members")
    .select("role, user_id")
    .eq("workspace_id", workspaceId);

  const userIds = (members || []).map((m) => m.user_id).filter(Boolean);
  const { data: users } = userIds.length > 0
    ? await supabase.from("users").select("id, name, email").in("id", userIds)
    : { data: [] };

  const usersMap = new Map((users || []).map((u) => [u.id, u]));

  const formattedMembers = (members || []).map((m) => {
    const user = usersMap.get(m.user_id);
    return {
      name: user?.name || null,
      email: user?.email || "Unknown",
      role: m.role,
    };
  });

  return {
    workspaceName: workspace.name,
    projects: formattedProjects,
    members: formattedMembers,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message, workspaceId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    let contextPrompt = "";
    if (workspaceId) {
      const supabase = await createClient();
      const workspaceContext = await getWorkspaceContext(supabase, workspaceId);

      if (workspaceContext) {
        contextPrompt = `\n\nCurrent workspace context (${workspaceContext.workspaceName}):
${JSON.stringify(workspaceContext, null, 2)}`;
      } else {
        contextPrompt = "\n\nNo workspace data available for the specified workspace.";
      }
    } else {
      contextPrompt = "\n\nThe user is on a public page and no workspace is selected. Provide general product guidance and onboarding help.";
    }

    const prompt = `${SYSTEM_PROMPT}${contextPrompt}\n\nUser question: ${message}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    let reply = "";
    let lastError: unknown;

    for (const modelName of DEFAULT_GEMINI_MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        reply = result.response.text();
        break;
      } catch (modelError) {
        lastError = modelError;
      }
    }

    if (!reply) {
      console.error("Chat API model selection failed:", {
        attemptedModels: DEFAULT_GEMINI_MODELS,
        error: lastError,
      });

      return NextResponse.json(
        { error: "No supported Gemini model is available. Set GEMINI_MODEL to a valid model for your API key." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
