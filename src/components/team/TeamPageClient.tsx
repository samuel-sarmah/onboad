"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Card, Input, Badge } from "@/components/ui";
import { UserPlus, Mail, MoreVertical, Trash2, Shield } from "lucide-react";

interface TeamMember {
  workspace_id: string;
  user_id: string;
  role: "admin" | "manager" | "member" | "viewer";
  users: {
    email: string;
    name: string | null;
    avatar_url: string | null;
  } | {
    email: string;
    name: string | null;
    avatar_url: string | null;
  }[];
}

interface TeamPageProps {
  workspaceId: string;
  initialMembers: TeamMember[];
  currentUserRole: string;
}

const roleColors = {
  admin: "error",
  manager: "warning",
  member: "info",
  viewer: "default",
} as const;

const rolePermissions = {
  admin: "Full access, manage members, delete workspace",
  manager: "Create/edit tasks, manage members",
  member: "Create/edit assigned tasks",
  viewer: "Read-only access",
};

function getUserData(member: TeamMember) {
  const users = member.users;
  if (Array.isArray(users)) {
    return users[0] || { email: "", name: null, avatar_url: null };
  }
  return users;
}

export function TeamPageClient({ workspaceId, initialMembers, currentUserRole }: TeamPageProps) {
  const supabase = createClient();
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "manager" | "member" | "viewer">("member");
  const [loading, setLoading] = useState(false);

  const canManageMembers = currentUserRole === "admin" || currentUserRole === "manager";

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setLoading(true);

    const { error } = await supabase.from("workspace_members").insert({
      workspace_id: workspaceId,
      user_id: inviteEmail,
      role: inviteRole,
    });

    if (!error) {
      setMembers([...members, {
        workspace_id: workspaceId,
        user_id: inviteEmail,
        role: inviteRole,
        users: { email: inviteEmail, name: null, avatar_url: null }
      }]);
      setInviteEmail("");
    }

    setIsInviting(false);
    setLoading(false);
  };

  const handleRemoveMember = async (userId: string) => {
    await supabase
      .from("workspace_members")
      .delete()
      .eq("workspace_id", workspaceId)
      .eq("user_id", userId);

    setMembers(members.filter((m) => m.user_id !== userId));
  };

  const handleChangeRole = async (userId: string, newRole: "admin" | "manager" | "member" | "viewer") => {
    await supabase
      .from("workspace_members")
      .update({ role: newRole })
      .eq("workspace_id", workspaceId)
      .eq("user_id", userId);

    setMembers(members.map((m) =>
      m.user_id === userId ? { ...m, role: newRole } : m
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Team</h1>
          <p className="text-gray-500">Manage workspace members and permissions</p>
        </div>
        {canManageMembers && (
          <Button onClick={() => setIsInviting(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        )}
      </div>

      {isInviting && (
        <Card className="mb-6">
          <h3 className="font-semibold mb-4">Invite Team Member</h3>
          <div className="flex gap-3 mb-4">
            <Input
              type="email"
              placeholder="Email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as typeof inviteRole)}
              className="px-3 py-2 border border-border rounded text-sm"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="member">Member</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleInvite} disabled={loading}>
              {loading ? "Inviting..." : "Send Invite"}
            </Button>
            <Button variant="outline" onClick={() => setIsInviting(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <Card>
        <h3 className="font-semibold mb-4">Team Members ({members.length})</h3>
        <div className="divide-y divide-border">
          {members.map((member) => {
            const userData = getUserData(member);
            return (
              <div
                key={member.user_id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {(userData.name || userData.email)[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {userData.name || "No name"}
                    </p>
                    <p className="text-xs text-gray-500">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={roleColors[member.role]}>
                    {member.role}
                  </Badge>
                  {canManageMembers && member.role !== "admin" && (
                    <button
                      onClick={() => handleRemoveMember(member.user_id)}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="mt-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Role Permissions
        </h3>
        <div className="space-y-3">
          {Object.entries(rolePermissions).map(([role, permission]) => (
            <div key={role} className="flex items-center justify-between">
              <Badge variant={roleColors[role as keyof typeof roleColors]}>
                {role}
              </Badge>
              <span className="text-sm text-gray-600">{permission}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
