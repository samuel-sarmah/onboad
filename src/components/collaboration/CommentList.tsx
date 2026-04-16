"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Input } from "@/components/ui";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  users?: {
    name: string | null;
    avatar_url: string | null;
  };
}

interface CommentListProps {
  taskId: string;
  initialComments: Comment[];
  currentUserId: string;
}

export function CommentList({ taskId, initialComments, currentUserId }: CommentListProps) {
  const supabase = createClient();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const { data: comment, error } = await supabase
      .from("comments")
      .insert({
        task_id: taskId,
        user_id: currentUserId,
        content: newComment,
      })
      .select()
      .single();

    if (!error && comment) {
      setComments([...comments, { ...comment, users: { name: "You", avatar_url: null } }]);
      setNewComment("");
      toast.success("Comment added");
    } else if (error) {
      toast.error("Failed to add comment");
    }

    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div>
      <h4 className="font-medium text-sm mb-3">Comments</h4>

      <div className="space-y-4 mb-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-primary">
                  {(comment.users?.name || "U")[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {comment.users?.name || "Unknown"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddComment();
            }
          }}
        />
        <Button
          size="sm"
          onClick={handleAddComment}
          disabled={!newComment.trim() || isSubmitting}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
