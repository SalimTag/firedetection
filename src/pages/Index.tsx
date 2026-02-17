/**
 * Fire Detection System - Main Page Component
 * @author Salim Tagemouati
 * @description Main landing page for the fire detection application with image upload and analysis
 */

import { useState } from "react";
import { Upload, Flame, Camera, Shield, Leaf, ArrowRight, UploadCloud, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ImagePreview } from "@/components/ImagePreview";
import { DetectionResults } from "@/components/DetectionResults";
import { TrainingDatasetInfo } from "@/components/TrainingDatasetInfo";
import { Navigation } from "@/components/Navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PerformanceChart } from "@/components/PerformanceChart";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";

/** Roboflow API key for authentication - from environment variables */
const ROBOFLOW_API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY || "MjbWNTPIJJkZrHJOseFr";
/** Roboflow model identifier for fire detection - from environment variables */
const ROBOFLOW_MODEL = import.meta.env.VITE_ROBOFLOW_MODEL || "fire-detection-g9ebb/8";

/**
 * Index page component - Main fire detection interface
 * @returns {JSX.Element} The main page component
 */
const Index = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const { toast } = useToast();

  /**
   * Handles image file upload and validation
   * @param {React.ChangeEvent<HTMLInputElement>} e - File input change event
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG)",
        });
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Submits the uploaded image to Roboflow API for fire detection
   * Converts image to base64 and sends to detection endpoint
   */
  const handleSubmit = async () => {
    if (!image) return;

    setIsLoading(true);
    try {
      // Get base64 image without the data URL prefix
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result?.toString().split(',')[1];
          if (base64) resolve(base64);
          else reject(new Error('Failed to convert image'));
        };
        reader.onerror = reject;
        reader.readAsDataURL(image);
      });

      const response = await fetch(
        `https://detect.roboflow.com/${ROBOFLOW_MODEL}?api_key=${ROBOFLOW_API_KEY}`,
        {
          method: "POST",
          body: base64Image,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Detection result:', result); // Added for debugging
      setDetectionResult(result);
      
      toast({
        title: "Detection Complete",
        description: `Found ${result.predictions?.length || 0} potential fire instances`,
      });
    } catch (error) {
      console.error("Detection error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resets the application state to allow uploading a new image
   */
  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setDetectionResult(null);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-32">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-fade-up">
          <div className="inline-block p-4 bg-purple-500/10 rounded-full mb-4">
            <Flame className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight">
            Intelligent Fire Detection System
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Protecting environments with advanced AI technology. Upload images to detect fire and smoke with high precision.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Upload Card */}
          <Card className="p-6 md:p-8 bg-white/5 backdrop-blur-lg border-slate-700 transition-transform hover:scale-[1.02]">
            <div className="space-y-6">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-slate-800/50"
                >
                  <ImagePreview 
                    preview={preview} 
                    predictions={detectionResult?.predictions} 
                  />
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                <Button
                  onClick={handleSubmit}
                  disabled={!image || isLoading}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      <span className="ml-2">Processing...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Analyze Image
                    </>
                  )}
                </Button>
                {(preview || detectionResult) && (
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    Upload Another Image
                  </Button>
                )}
              </div>

              <DetectionResults predictions={detectionResult?.predictions} />
            </div>
          </Card>

          <div className="space-y-8">
            <TrainingDatasetInfo />
            <PerformanceChart />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <FAQ />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
