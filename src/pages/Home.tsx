import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PostCardWithComments } from "@/components/post/PostCardWithComments";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  user_id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
}

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        user_id,
        image_url,
        caption,
        created_at,
        profiles!posts_user_id_fkey (
          username,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      const transformedPosts = data.map(post => ({
        ...post,
        profiles: post.profiles as unknown as { username: string; avatar_url: string | null }
      }));
      setPosts(transformedPosts);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <ImageOff className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No posts yet</p>
            <p className="text-sm mt-1 mb-4">
              Be the first to share something!
            </p>
            <Link to="/create">
              <Button className="gradient-primary border-0">
                Create Post
              </Button>
            </Link>
          </div>
        ) : (
          posts.map((post, index) => (
            <div
              key={post.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-slide-up"
            >
              <PostCardWithComments
                id={post.id}
                username={post.profiles?.username || "User"}
                userId={post.user_id}
                userAvatar={post.profiles?.avatar_url || undefined}
                imageUrl={post.image_url}
                caption={post.caption || undefined}
                createdAt={post.created_at}
              />
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default Home;
