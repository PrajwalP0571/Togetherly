import { PageLayout } from "@/components/layout/PageLayout";
import { PostCard } from "@/components/post/PostCard";

// Mock data for demo
const mockPosts = [
  {
    id: "1",
    username: "sarah.design",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",
    caption: "Morning hike views never disappoint ✨ The mountains were calling and I had to go.",
    likesCount: 234,
    commentsCount: 18,
    timeAgo: "2 hours ago",
    isLiked: false,
  },
  {
    id: "2",
    username: "alex.captures",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop",
    caption: "Starry nights and mountain lights 🌌",
    likesCount: 892,
    commentsCount: 45,
    timeAgo: "5 hours ago",
    isLiked: true,
  },
  {
    id: "3",
    username: "maya.lens",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=800&fit=crop",
    caption: "Lake reflections at golden hour 🌅",
    likesCount: 1205,
    commentsCount: 67,
    timeAgo: "8 hours ago",
    isLiked: false,
  },
  {
    id: "4",
    username: "travel.with.emma",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop",
    caption: "Finding peace in nature's embrace 🌲",
    likesCount: 567,
    commentsCount: 23,
    timeAgo: "1 day ago",
    isLiked: false,
  },
];

const Home = () => {
  return (
    <PageLayout>
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {mockPosts.map((post, index) => (
          <div
            key={post.id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-slide-up"
          >
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Home;
