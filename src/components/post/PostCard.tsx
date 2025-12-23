import { useState } from "react";
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { cn } from "@/lib/utils";

interface PostCardProps {
  id: string;
  username: string;
  userAvatar?: string;
  imageUrl: string;
  caption?: string;
  likesCount: number;
  commentsCount: number;
  timeAgo: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export const PostCard = ({
  username,
  userAvatar,
  imageUrl,
  caption,
  likesCount,
  commentsCount,
  timeAgo,
  isLiked: initialIsLiked = false,
  isSaved: initialIsSaved = false,
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [likes, setLikes] = useState(likesCount);
  const [showHeart, setShowHeart] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikes(likes + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 600);
  };

  return (
    <article className="bg-card rounded-2xl shadow-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <UserAvatar src={userAvatar} username={username} size="md" />
          <div>
            <p className="font-semibold text-sm">{username}</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
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
            <button className="p-1 transition-transform active:scale-90">
              <MessageCircle className="h-6 w-6" />
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

        <p className="font-semibold text-sm">{likes.toLocaleString()} likes</p>

        {caption && (
          <p className="text-sm">
            <span className="font-semibold">{username}</span>{" "}
            <span className="text-foreground/90">{caption}</span>
          </p>
        )}

        {commentsCount > 0 && (
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all {commentsCount} comments
          </button>
        )}
      </div>
    </article>
  );
};
