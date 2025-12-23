import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock conversation data
const mockConversations: Record<string, { username: string; avatar: string }> = {
  "1": {
    username: "sarah.design",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  "2": {
    username: "alex.captures",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  "3": {
    username: "maya.lens",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
  "4": {
    username: "travel.with.emma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
};

interface Message {
  id: string;
  text: string;
  isMine: boolean;
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: "1", text: "Hey! How are you?", isMine: false, timestamp: "10:30 AM" },
  { id: "2", text: "I'm doing great! Just got back from a hike 🏔️", isMine: true, timestamp: "10:32 AM" },
  { id: "3", text: "That photo was amazing! Where was it taken?", isMine: false, timestamp: "10:33 AM" },
];

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = id ? mockConversations[id] : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversation) {
    navigate("/messages");
    return null;
  }

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      isMine: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center h-14 max-w-lg mx-auto px-2">
          <button
            onClick={() => navigate("/messages")}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 ml-2 flex-1">
            <UserAvatar
              src={conversation.avatar}
              username={conversation.username}
              size="sm"
            />
            <span className="font-semibold">{conversation.username}</span>
          </div>
          <button className="p-2 rounded-full hover:bg-accent transition-colors">
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 pt-14 pb-20 px-4 overflow-y-auto">
        <div className="max-w-lg mx-auto py-4 space-y-3">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex animate-fade-in",
                message.isMine ? "justify-end" : "justify-start"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2",
                  message.isMine
                    ? "gradient-primary text-primary-foreground rounded-br-md"
                    : "bg-card text-foreground rounded-bl-md shadow-card"
                )}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={cn(
                    "text-[10px] mt-1",
                    message.isMine ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-3">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-background"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            size="icon"
            className="gradient-primary border-0 flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
