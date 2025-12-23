import { useState, useMemo } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { UserSearchItem } from "@/components/search/UserSearchItem";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Users, X } from "lucide-react";

// Mock users data - will be replaced with real data from database
const mockUsers = [
  {
    id: "1",
    username: "sarah.design",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    bio: "Designer & photographer",
    isFollowing: true,
  },
  {
    id: "2",
    username: "alex.captures",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    bio: "Landscape photography",
    isFollowing: false,
  },
  {
    id: "3",
    username: "maya.lens",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    bio: "Travel • Nature • Life",
    isFollowing: false,
  },
  {
    id: "4",
    username: "travel.with.emma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    bio: "Exploring the world one photo at a time",
    isFollowing: false,
    isRequested: true,
  },
  {
    id: "5",
    username: "photo.wanderer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    bio: "Mountain enthusiast",
    isFollowing: false,
  },
  {
    id: "6",
    username: "nature.explorer",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
    bio: "Wildlife & nature photography",
    isFollowing: false,
  },
  {
    id: "7",
    username: "sunset.chaser",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    bio: "Chasing golden hours",
    isFollowing: true,
  },
  {
    id: "8",
    username: "mountain.vibes",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop",
    bio: "Adventure seeker",
    isFollowing: false,
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockUsers;
    }
    const query = searchQuery.toLowerCase();
    return mockUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.bio?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Search</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Find friends to follow
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-card border-border h-12"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-accent transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Results */}
        {filteredUsers.length > 0 ? (
          <div className="space-y-3">
            {filteredUsers.map((user, index) => (
              <div
                key={user.id}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <UserSearchItem
                  {...user}
                  onFollow={(id) => console.log("Follow:", id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm mt-1">
              Try searching with a different username
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Search;
