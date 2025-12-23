import { Bell, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-14 max-w-lg mx-auto px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            Pixie
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            to="/requests"
            className="p-2 rounded-full hover:bg-accent transition-colors relative"
          >
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
          </Link>
          <button className="p-2 rounded-full hover:bg-accent transition-colors relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
