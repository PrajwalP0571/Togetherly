import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ConversationItem } from "@/components/messages/ConversationItem";
import { MessageCircle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockConversations = [
  {
    id: "1",
    username: "sarah.design",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    lastMessage: "That photo was amazing! Where was it taken?",
    timeAgo: "2m",
    unread: true,
  },
  {
    id: "2",
    username: "alex.captures",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    lastMessage: "Thanks for the follow! 📸",
    timeAgo: "1h",
    unread: true,
  },
  {
    id: "3",
    username: "maya.lens",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    lastMessage: "Sure, let's plan that hiking trip!",
    timeAgo: "3h",
    unread: false,
  },
  {
    id: "4",
    username: "travel.with.emma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    lastMessage: "The sunset was incredible yesterday",
    timeAgo: "1d",
    unread: false,
  },
];

const mockRequests = [
  {
    id: "r1",
    username: "new.friend",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    lastMessage: "Hi! I saw your photos and would love to connect.",
    timeAgo: "5m",
    unread: true,
  },
];

const Messages = () => {
  const [tab, setTab] = useState<"chats" | "requests">("chats");

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setTab("chats")}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors relative",
              tab === "chats"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chats
            </div>
            {tab === "chats" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setTab("requests")}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors relative",
              tab === "requests"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <Inbox className="h-4 w-4" />
              Requests
              {mockRequests.length > 0 && (
                <span className="h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {mockRequests.length}
                </span>
              )}
            </div>
            {tab === "requests" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="py-2">
          {tab === "chats" ? (
            mockConversations.length > 0 ? (
              <div className="space-y-1">
                {mockConversations.map((convo, index) => (
                  <div
                    key={convo.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ConversationItem {...convo} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No messages yet</p>
                <p className="text-sm">Start a conversation with someone you follow</p>
              </div>
            )
          ) : mockRequests.length > 0 ? (
            <div className="space-y-1">
              {mockRequests.map((req, index) => (
                <div
                  key={req.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ConversationItem {...req} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Inbox className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No message requests</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Messages;
