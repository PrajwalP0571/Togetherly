import { PageLayout } from "@/components/layout/PageLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileGrid } from "@/components/profile/ProfileGrid";

// Mock data
const mockProfile = {
  username: "you",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  bio: "Photography enthusiast 📸 | Mountain lover 🏔️ | Coffee addict ☕",
  postsCount: 42,
  followersCount: 1234,
  followingCount: 567,
};

const mockPosts = [
  { id: "1", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" },
  { id: "2", imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop" },
  { id: "3", imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop" },
  { id: "4", imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop" },
  { id: "5", imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop" },
  { id: "6", imageUrl: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&h=400&fit=crop" },
  { id: "7", imageUrl: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=400&h=400&fit=crop" },
  { id: "8", imageUrl: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=400&h=400&fit=crop" },
  { id: "9", imageUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&h=400&fit=crop" },
];

const Profile = () => {
  return (
    <PageLayout>
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <div className="animate-fade-in">
          <ProfileHeader
            {...mockProfile}
            isOwnProfile={true}
            onEditProfile={() => console.log("Edit profile")}
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <ProfileGrid posts={mockPosts} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
