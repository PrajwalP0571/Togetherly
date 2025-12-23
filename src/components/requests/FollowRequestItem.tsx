import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface FollowRequestItemProps {
  id: string;
  username: string;
  avatar?: string;
  timeAgo: string;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export const FollowRequestItem = ({
  id,
  username,
  avatar,
  timeAgo,
  onAccept,
  onDecline,
}: FollowRequestItemProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card animate-fade-in">
      <UserAvatar src={avatar} username={username} size="lg" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{username}</p>
        <p className="text-xs text-muted-foreground">
          wants to follow you • {timeAgo}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={() => onAccept(id)}
          className="h-8 px-3 gap-1"
        >
          <Check className="h-4 w-4" />
          Accept
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onDecline(id)}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
