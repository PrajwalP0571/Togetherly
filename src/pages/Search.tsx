import { useState, useMemo, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { UserSearchItem } from "@/components/search/UserSearchItem";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Users, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  bio: string | null;
  avatar_url: string | null;
}

const Search = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("user_id", user?.id || "")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data as UserProfile[]);
      }
      setLoading(false);
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }
    const query = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(query) ||
        u.bio?.toLowerCase().includes(query)
    );
  }, [searchQuery, users]);

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
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="space-y-3">
            {filteredUsers.map((u, index) => (
              <div
                key={u.id}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <UserSearchItem
                  id={u.id}
                  userId={u.user_id}
                  username={u.username}
                  avatar={u.avatar_url || undefined}
                  bio={u.bio || undefined}
                />
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No users yet</p>
            <p className="text-sm mt-1">
              Be the first to invite your friends!
            </p>
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
