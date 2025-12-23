import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  username: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showStory?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
};

export const UserAvatar = ({
  src,
  username,
  size = "md",
  className,
  showStory = false,
}: UserAvatarProps) => {
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "relative rounded-full",
        showStory && "p-0.5 gradient-primary",
        className
      )}
    >
      <Avatar
        className={cn(
          sizeClasses[size],
          showStory && "border-2 border-background"
        )}
      >
        <AvatarImage src={src} alt={username} className="object-cover" />
        <AvatarFallback className="bg-accent text-accent-foreground font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
