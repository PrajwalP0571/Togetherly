import { Grid, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  imageUrl: string;
}

interface ProfileGridProps {
  posts: Post[];
}

export const ProfileGrid = ({ posts }: ProfileGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-center gap-4 py-2">
        <button
          onClick={() => setViewMode("grid")}
          className={cn(
            "p-2 rounded-lg transition-colors",
            viewMode === "grid"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Grid className="h-5 w-5" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={cn(
            "p-2 rounded-lg transition-colors",
            viewMode === "list"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <List className="h-5 w-5" />
        </button>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square bg-muted overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={post.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 px-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square bg-muted rounded-xl overflow-hidden"
            >
              <img
                src={post.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No posts yet</p>
        </div>
      )}
    </div>
  );
};
