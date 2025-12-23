import { useState, useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePost = async () => {
    if (!selectedImage) {
      toast.error("Please select an image");
      return;
    }

    setIsPosting(true);
    // Simulate posting
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsPosting(false);
    toast.success("Post shared successfully!");
    navigate("/");
  };

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">New Post</h1>
          <Button
            onClick={handlePost}
            disabled={!selectedImage || isPosting}
            className="gradient-primary border-0"
          >
            {isPosting ? "Sharing..." : "Share"}
          </Button>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          {selectedImage ? (
            <div className="relative rounded-2xl overflow-hidden shadow-card animate-fade-in">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full aspect-square object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 p-2 bg-foreground/80 text-background rounded-full hover:bg-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square rounded-2xl border-2 border-dashed border-border bg-card hover:bg-accent/50 transition-colors flex flex-col items-center justify-center gap-4"
            >
              <div className="p-4 rounded-full bg-accent">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-medium">Add a photo</p>
                <p className="text-sm text-muted-foreground">
                  Tap to select from your gallery
                </p>
              </div>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* Caption */}
          <div className="space-y-2">
            <Textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[120px] resize-none bg-card border-border focus:ring-primary"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {caption.length}/500
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CreatePost;
