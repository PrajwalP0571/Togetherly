import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface UserSearchItemProps {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  isFollowing?: boolean;
  isRequested?: boolean;
  onFollow?: (id: string) => void;
}

export const UserSearchItem = ({
  id,
  username,
  avatar,
  bio,
  isFollowing: initialIsFollowing = false,
  isRequested: initialIsRequested = false,
  onFollow,
}: UserSearchItemProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isRequested, setIsRequested] = useState(initialIsRequested);

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      toast.info(`Unfollowed ${username}`);
    } else if (isRequested) {
      setIsRequested(false);
      toast.info("Follow request cancelled");
    } else {
      setIsRequested(true);
      toast.success(`Follow request sent to ${username}`);
    }
    onFollow?.(id);
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card animate-fade-in">
      <UserAvatar src={avatar} username={username} size="lg" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{username}</p>
        {bio && (
          <p className="text-xs text-muted-foreground truncate">{bio}</p>
        )}
      </div>
      <Button
        size="sm"
        variant={isFollowing ? "secondary" : isRequested ? "secondary" : "default"}
        onClick={handleFollow}
        className={!isFollowing && !isRequested ? "gradient-primary border-0" : ""}
      >
        {isFollowing ? "Following" : isRequested ? "Requested" : "Follow"}
      </Button>
    </div>
  );
};
