import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
}

interface CommentSectionProps {
  postId: string;
  onCommentCountChange?: (count: number) => void;
}

export const CommentSection = ({ postId, onCommentCountChange }: CommentSectionProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles!comments_user_id_fkey (
          username,
          avatar_url
        )
      `)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      const transformedComments = data.map(comment => ({
        ...comment,
        profiles: comment.profiles as unknown as { username: string; avatar_url: string | null }
      }));
      setComments(transformedComments);
      onCommentCountChange?.(data.length);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        user_id: user.id,
        content: newComment.trim(),
      });

    if (error) {
      toast.error("Failed to post comment");
    } else {
      setNewComment("");
      fetchComments();
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.length > 0 && (
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2">
              <Link to={`/user/${comment.user_id}`}>
                <UserAvatar
                  src={comment.profiles?.avatar_url || undefined}
                  username={comment.profiles?.username || "User"}
                  size="sm"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <Link 
                    to={`/user/${comment.user_id}`}
                    className="font-semibold hover:underline"
                  >
                    {comment.profiles?.username}
                  </Link>{" "}
                  <span className="text-foreground/90">{comment.content}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 h-9 text-sm"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          size="sm"
          disabled={!newComment.trim() || isSubmitting}
          className="h-9 px-3"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};
