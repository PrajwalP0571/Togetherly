import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UserSearchItemProps {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  bio?: string;
}

export const UserSearchItem = ({
  id,
  userId,
  username,
  avatar,
  bio,
}: UserSearchItemProps) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkFollowStatus();
    }
  }, [user, userId]);

  const checkFollowStatus = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", userId)
      .maybeSingle();
    setIsFollowing(!!data);
  };

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    setIsLoading(true);

    if (isFollowing) {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", user.id)
        .eq("following_id", userId);

      if (!error) {
        setIsFollowing(false);
        toast.info(`Unfollowed ${username}`);
      }
    } else {
      const { error } = await supabase
        .from("follows")
        .insert({ follower_id: user.id, following_id: userId });

      if (!error) {
        setIsFollowing(true);
        toast.success(`Following ${username}!`);
      }
    }
    setIsLoading(false);
  };

  return (
    <Link to={`/user/${userId}`}>
      <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card animate-fade-in hover:bg-accent/50 transition-colors">
        <UserAvatar src={avatar} username={username} size="lg" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{username}</p>
          {bio && (
            <p className="text-xs text-muted-foreground truncate">{bio}</p>
          )}
        </div>
        <Button
          size="sm"
          variant={isFollowing ? "secondary" : "default"}
          onClick={handleFollow}
          disabled={isLoading}
          className={!isFollowing ? "gradient-primary border-0" : ""}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    </Link>
  );
};
