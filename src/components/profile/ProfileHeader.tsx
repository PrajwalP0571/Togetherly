import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { Settings, Edit2 } from "lucide-react";

interface ProfileHeaderProps {
  username: string;
  avatar?: string;
  bio?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  isRequested?: boolean;
  onEditProfile?: () => void;
  onFollow?: () => void;
}

export const ProfileHeader = ({
  username,
  avatar,
  bio,
  postsCount,
  followersCount,
  followingCount,
  isOwnProfile = false,
  isFollowing = false,
  isRequested = false,
  onEditProfile,
  onFollow,
}: ProfileHeaderProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <UserAvatar src={avatar} username={username} size="xl" />
          <div>
            <h1 className="text-xl font-bold">{username}</h1>
            {bio && (
              <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">
                {bio}
              </p>
            )}
          </div>
        </div>
        {isOwnProfile && (
          <button className="p-2 rounded-full hover:bg-accent transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-around py-4 border-y border-border">
        <div className="text-center">
          <p className="font-bold text-lg">{postsCount}</p>
          <p className="text-xs text-muted-foreground">Posts</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">{followersCount}</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">{followingCount}</p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
      </div>

      {/* Action Button */}
      {isOwnProfile ? (
        <Button
          onClick={onEditProfile}
          variant="secondary"
          className="w-full gap-2"
        >
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </Button>
      ) : (
        <Button
          onClick={onFollow}
          variant={isFollowing ? "secondary" : "default"}
          className="w-full"
        >
          {isRequested ? "Requested" : isFollowing ? "Following" : "Follow"}
        </Button>
      )}
    </div>
  );
};
