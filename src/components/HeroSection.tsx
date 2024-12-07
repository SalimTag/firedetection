import { Flame } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="text-center space-y-6 animate-fade-up">
      <div className="inline-block p-4 bg-purple-500/10 rounded-full mb-4">
        <Flame className="w-12 h-12 text-purple-500" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight font-roboto">
        Intelligent Fire Detection System
      </h1>
      <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-inter">
        Protecting environments with advanced AI technology. Upload images to detect fire and smoke with high precision.
      </p>
    </div>
  );
};