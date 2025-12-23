import { UserAvatar } from "@/components/ui/UserAvatar";
import { Link } from "react-router-dom";

interface ConversationItemProps {
  id: string;
  username: string;
  avatar?: string;
  lastMessage: string;
  timeAgo: string;
  unread?: boolean;
}

export const ConversationItem = ({
  id,
  username,
  avatar,
  lastMessage,
  timeAgo,
  unread = false,
}: ConversationItemProps) => {
  return (
    <Link
      to={`/messages/${id}`}
      className="flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors rounded-xl"
    >
      <UserAvatar src={avatar} username={username} size="lg" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`font-semibold text-sm ${unread ? "text-foreground" : ""}`}>
            {username}
          </p>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
        <p
          className={`text-sm truncate ${
            unread ? "text-foreground font-medium" : "text-muted-foreground"
          }`}
        >
          {lastMessage}
        </p>
      </div>
      {unread && (
        <div className="h-2.5 w-2.5 bg-primary rounded-full flex-shrink-0" />
      )}
    </Link>
  );
};
