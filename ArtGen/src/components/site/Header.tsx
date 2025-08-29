import React from "react";
import hero from "../../assets/hero-3d.webp";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="text-center my-12 md:my-16 animate-fade-in">
      <div className="inline-flex items-center gap-2 bg-card px-6 py-1 rounded-full border">
        <span className="text-muted-foreground">Best text to image generator</span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-6 px-4">
        Convert text to <span className="text-primary">image</span> in seconds...
      </h1>
      <p className="max-w-2xl mx-auto mt-4 text-muted-foreground px-4 text-sm sm:text-base">
        Unleash your creativity with AI. Type your idea and watch the magic happen — fast.
      </p>
      <div className="mt-8">
        <Button variant="hero" size="lg" onClick={() => navigate("/result")} className="hover-scale">
          Generate Images
        </Button>
      </div>
      <div className="mt-12">
        <img 
          src={hero} 
          alt="3D AI image generator illustration" 
          className="mx-auto rounded-xl shadow-[var(--shadow-elegant)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto" 
          loading="lazy" 
          decoding="async" 
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, 60vw"
        />
      </div>
    </section>
  );
};
