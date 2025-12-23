import { useState, useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileGrid } from "@/components/profile/ProfileGrid";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LogOut, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Mock posts for now
const mockPosts = [
  { id: "1", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" },
  { id: "2", imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop" },
  { id: "3", imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop" },
];

const Profile = () => {
  const { user, profile, signOut, updateProfile, uploadAvatar, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [editForm, setEditForm] = useState({
    username: profile?.username || "",
    bio: profile?.bio || "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const handleEditProfile = () => {
    setEditForm({
      username: profile?.username || "",
      bio: profile?.bio || "",
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    const { error } = await updateProfile({
      username: editForm.username,
      bio: editForm.bio,
    });

    if (error) {
      toast.error(error.message || "Failed to update profile");
    } else {
      toast.success("Profile updated!");
      setIsEditModalOpen(false);
    }
    setIsLoading(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setIsUploadingAvatar(true);
    const { error } = await uploadAvatar(file);

    if (error) {
      toast.error("Failed to upload avatar");
    } else {
      toast.success("Avatar updated!");
    }
    setIsUploadingAvatar(false);
  };

  if (!profile) {
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
        {/* Logout Button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="animate-fade-in">
          <ProfileHeader
            username={profile.username}
            avatar={profile.avatar_url || undefined}
            bio={profile.bio || undefined}
            postsCount={mockPosts.length}
            followersCount={0}
            followingCount={0}
            isOwnProfile={true}
            onEditProfile={handleEditProfile}
          />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <ProfileGrid posts={mockPosts} />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-accent overflow-hidden">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-accent-foreground">
                      {profile.username.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                  className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Tap the camera icon to change your photo
              </p>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value.toLowerCase() })
                }
                placeholder="your.username"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="resize-none"
                maxLength={150}
              />
              <p className="text-xs text-muted-foreground text-right">
                {editForm.bio.length}/150
              </p>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="w-full gradient-primary border-0"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Profile;
