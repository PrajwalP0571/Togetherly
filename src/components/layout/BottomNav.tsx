import { Home, PlusSquare, MessageCircle, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Users, label: "Requests", path: "/requests" },
  { icon: PlusSquare, label: "Create", path: "/create" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          const isCreate = path === "/create";

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
                isCreate && "relative"
              )}
            >
              {isCreate ? (
                <div className="gradient-primary p-2 rounded-xl text-primary-foreground shadow-soft">
                  <Icon className="h-5 w-5" />
                </div>
              ) : (
                <>
                  <Icon
                    className={cn("h-6 w-6", isActive && "fill-primary/20")}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
