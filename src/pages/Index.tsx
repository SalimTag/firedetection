import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { UploadSection } from "@/components/UploadSection";
import { MetricsSection } from "@/components/MetricsSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { Camera, Shield, Leaf } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "Real-time Detection",
      description: "Instant fire detection with high accuracy across various environments",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Shield,
      title: "Advanced AI Model",
      description: "Powered by YOLOv8 architecture trained on extensive fire datasets",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "Early detection helps prevent environmental damage and protect ecosystems",
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 font-inter">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-32">
        <HeroSection />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <UploadSection />
          <MetricsSection />
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12 font-roboto">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <FAQ />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;