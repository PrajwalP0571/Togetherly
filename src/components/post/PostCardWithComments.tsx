import { useState, useEffect } from "react";
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { CommentSection } from "./CommentSection";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface PostCardWithCommentsProps {
  id: string;
  username: string;
  userId: string;
  userAvatar?: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
}

export const PostCardWithComments = ({
  id,
  username,
  userId,
  userAvatar,
  imageUrl,
  caption,
  createdAt,
}: PostCardWithCommentsProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetchLikeStatus();
    fetchLikesCount();
  }, [id, user]);

  const fetchLikeStatus = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", id)
      .eq("user_id", user.id)
      .maybeSingle();
    setIsLiked(!!data);
  };

  const fetchLikesCount = async () => {
    const { count } = await supabase
      .from("likes")
      .select("id", { count: "exact" })
      .eq("post_id", id);
    setLikesCount(count || 0);
  };

  const handleLike = async () => {
    if (!user) return;

    if (isLiked) {
      await supabase.from("likes").delete().eq("post_id", id).eq("user_id", user.id);
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      await supabase.from("likes").insert({ post_id: id, user_id: user.id });
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const handleDoubleTap = async () => {
    if (!isLiked && user) {
      await supabase.from("likes").insert({ post_id: id, user_id: user.id });
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 600);
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <article className="bg-card rounded-2xl shadow-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <Link to={`/user/${userId}`} className="flex items-center gap-3">
          <UserAvatar src={userAvatar} username={username} size="md" />
          <div>
            <p className="font-semibold text-sm hover:underline">{username}</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </Link>
        <button className="p-2 rounded-full hover:bg-accent transition-colors">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative aspect-square bg-muted cursor-pointer"
        onDoubleClick={handleDoubleTap}
      >
        <img
          src={imageUrl}
          alt={`Post by ${username}`}
          className="w-full h-full object-cover"
        />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="h-24 w-24 text-primary-foreground fill-primary animate-heart drop-shadow-lg" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="p-1 transition-transform active:scale-90"
            >
              <Heart
                className={cn(
                  "h-6 w-6 transition-colors",
                  isLiked ? "fill-like text-like" : "text-foreground"
                )}
              />
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="p-1 transition-transform active:scale-90"
            >
              <MessageCircle className={cn("h-6 w-6", showComments && "text-primary")} />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-1 transition-transform active:scale-90"
          >
            <Bookmark
              className={cn(
                "h-6 w-6 transition-colors",
                isSaved ? "fill-foreground" : ""
              )}
            />
          </button>
        </div>

        <p className="font-semibold text-sm">{likesCount.toLocaleString()} likes</p>

        {caption && (
          <p className="text-sm">
            <Link to={`/user/${userId}`} className="font-semibold hover:underline">
              {username}
            </Link>{" "}
            <span className="text-foreground/90">{caption}</span>
          </p>
        )}

        {commentsCount > 0 && !showComments && (
          <button 
            onClick={() => setShowComments(true)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all {commentsCount} comments
          </button>
        )}

        {showComments && (
          <div className="pt-2 border-t border-border">
            <CommentSection 
              postId={id} 
              onCommentCountChange={setCommentsCount}
            />
          </div>
        )}
      </div>
    </article>
  );
};
