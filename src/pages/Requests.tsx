import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { FollowRequestItem } from "@/components/requests/FollowRequestItem";
import { Users } from "lucide-react";
import { toast } from "sonner";

// Mock data
const initialRequests = [
  {
    id: "1",
    username: "photo.wanderer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    timeAgo: "2m ago",
  },
  {
    id: "2",
    username: "nature.explorer",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
    timeAgo: "15m ago",
  },
  {
    id: "3",
    username: "sunset.chaser",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    timeAgo: "1h ago",
  },
  {
    id: "4",
    username: "mountain.vibes",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop",
    timeAgo: "3h ago",
  },
];

const Requests = () => {
  const [requests, setRequests] = useState(initialRequests);

  const handleAccept = (id: string) => {
    const user = requests.find((r) => r.id === id);
    setRequests(requests.filter((r) => r.id !== id));
    toast.success(`You accepted ${user?.username}'s request`);
  };

  const handleDecline = (id: string) => {
    const user = requests.find((r) => r.id === id);
    setRequests(requests.filter((r) => r.id !== id));
    toast.info(`Declined ${user?.username}'s request`);
  };

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Follow Requests</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {requests.length} pending request{requests.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Requests List */}
        {requests.length > 0 ? (
          <div className="space-y-3">
            {requests.map((request, index) => (
              <div
                key={request.id}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <FollowRequestItem
                  {...request}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No pending requests</p>
            <p className="text-sm mt-1">When someone requests to follow you, you'll see it here</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Requests;
