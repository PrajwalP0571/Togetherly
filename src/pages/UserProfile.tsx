import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserProfileData {
  id: string;
  user_id: string;
  username: string;
  bio: string | null;
  avatar_url: string | null;
}

interface Post {
  id: string;
  imageUrl: string;
}

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchProfile();
      fetchPosts();
      checkFollowStatus();
      fetchFollowCounts();
    }
  }, [userId, user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      toast.error("Failed to load profile");
      navigate("/search");
      return;
    }

    if (!data) {
      toast.error("User not found");
      navigate("/search");
      return;
    }

    setProfile(data);
    setIsLoading(false);
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("id, image_url")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) {
      setPosts(data.map(p => ({ id: p.id, imageUrl: p.image_url })));
    }
  };

  const checkFollowStatus = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", userId)
      .maybeSingle();

    setIsFollowing(!!data);
  };

  const fetchFollowCounts = async () => {
    const [followersRes, followingRes] = await Promise.all([
      supabase.from("follows").select("id", { count: "exact" }).eq("following_id", userId),
      supabase.from("follows").select("id", { count: "exact" }).eq("follower_id", userId),
    ]);

    setFollowersCount(followersRes.count || 0);
    setFollowingCount(followingRes.count || 0);
  };

  const handleFollow = async () => {
    if (!user) return;
    
    setIsFollowLoading(true);
    
    if (isFollowing) {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", user.id)
        .eq("following_id", userId);

      if (!error) {
        setIsFollowing(false);
        setFollowersCount(prev => prev - 1);
        toast.success("Unfollowed");
      }
    } else {
      const { error } = await supabase
        .from("follows")
        .insert({ follower_id: user.id, following_id: userId });

      if (!error) {
        setIsFollowing(true);
        setFollowersCount(prev => prev + 1);
        toast.success("Following!");
      }
    }
    
    setIsFollowLoading(false);
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

  if (!profile) {
    return null;
  }

  const isOwnProfile = user?.id === userId;

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="animate-fade-in">
          <ProfileHeader
            username={profile.username}
            avatar={profile.avatar_url || undefined}
            bio={profile.bio || undefined}
            postsCount={posts.length}
            followersCount={followersCount}
            followingCount={followingCount}
            isOwnProfile={isOwnProfile}
            isFollowing={isFollowing}
            onFollow={isOwnProfile ? undefined : handleFollow}
            onEditProfile={isOwnProfile ? () => navigate("/profile") : undefined}
          />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <ProfileGrid posts={posts} />
        </div>
      </div>
    </PageLayout>
  );
};

export default UserProfile;
