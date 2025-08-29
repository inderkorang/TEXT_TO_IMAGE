import React, { useState } from "react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/components/site/useApp";
import { toast } from "sonner";
import hero from "@/assets/hero-3d.webp";
import { useNavigate } from "react-router-dom";

const Result: React.FC = () => {
  const { user, setShowLogin, loading: authLoading, generateImage, credit } = useApp();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a prompt to generate an image");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await generateImage(input.trim());
      if (imageUrl) {
        setImage(imageUrl);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center py-12">
      <Seo
        title="Generate — ArtGen"
        description="Generate AI images from text prompts."
        canonical={window.location.origin + "/result"}
      />
      <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Free Credits Remaining</p>
          <p className="text-2xl font-bold text-primary">{credit}</p>
          {!user && (
            <p className="text-xs text-muted-foreground mt-1">
              No sign-up required! Generate 10 free images instantly.
            </p>
          )}
        </div>
        <div className="relative">
          {image ? (
            <img
              src={image}
              alt="Generated AI image preview"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-xl border shadow"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, (max-width: 1024px) 50vw, 40vw"
            />
          ) : (
            <img
              src={hero}
              alt="3D AI image generator preview"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-xl border shadow animate-fade-in"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, (max-width: 1024px) 50vw, 40vw"
            />
          )}
          {loading && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-sm">Generating image...</p>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-xl bg-secondary text-foreground text-sm p-1 rounded-full"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to generate"
            className="flex-1 rounded-full border-0 bg-transparent"
            disabled={loading}
          />
          <Button type="submit" className="rounded-full" disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>

        {image && (
          <div className="flex gap-3 flex-wrap justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setImage(null);
                setInput("");
              }}
            >
              Generate Another
            </Button>
            <a href={image} download="generated-image.png">
              <Button>Download</Button>
            </a>
          </div>
        )}
      </div>
    </main>
  );
};

export default Result;
