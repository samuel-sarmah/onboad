export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workspaces: {
        Row: {
          id: string
          name: string
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      workspace_members: {
        Row: {
          workspace_id: string
          user_id: string
          role: "admin" | "manager" | "member" | "viewer"
          created_at: string
        }
        Insert: {
          workspace_id: string
          user_id: string
          role?: "admin" | "manager" | "member" | "viewer"
          created_at?: string
        }
        Update: {
          workspace_id?: string
          user_id?: string
          role?: "admin" | "manager" | "member" | "viewer"
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          workspace_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      columns: {
        Row: {
          id: string
          project_id: string
          name: string
          position: number
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          position: number
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          position?: number
          color?: string | null
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          column_id: string
          title: string
          description: string | null
          priority: "low" | "medium" | "high" | "urgent"
          due_date: string | null
          assigned_to: string | null
          created_by: string
          position: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          column_id: string
          title: string
          description?: string | null
          priority?: "low" | "medium" | "high" | "urgent"
          due_date?: string | null
          assigned_to?: string | null
          created_by: string
          position?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          column_id?: string
          title?: string
          description?: string | null
          priority?: "low" | "medium" | "high" | "urgent"
          due_date?: string | null
          assigned_to?: string | null
          created_by?: string
          position?: number
          created_at?: string
          updated_at?: string
        }
      }
      subtasks: {
        Row: {
          id: string
          task_id: string
          title: string
          completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          task_id: string
          title: string
          completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          title?: string
          completed?: boolean
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          task_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          user_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          message?: string
          read?: boolean
          created_at?: string
        }
      }
    }
  }
}

export type WorkspaceMemberRole = "admin" | "manager" | "member" | "viewer"
export type TaskPriority = "low" | "medium" | "high" | "urgent"
