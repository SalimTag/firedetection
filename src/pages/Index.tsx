import { useState } from "react";
import { Upload, Flame, Camera, Shield, Leaf, ArrowRight, UploadCloud, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ImagePreview } from "@/components/ImagePreview";
import { DetectionResults } from "@/components/DetectionResults";
import { TrainingDatasetInfo } from "@/components/TrainingDatasetInfo";
import { Navigation } from "@/components/Navigation";

const ROBOFLOW_API_KEY = "MjbWNTPIJJkZrHJOseFr";
const ROBOFLOW_MODEL = "fire-detection-g9ebb/8";

const Index = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const { toast } = useToast();

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
      
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setDetectionResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-32">
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

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card className="p-6 md:p-8 bg-white/5 backdrop-blur-lg border-slate-700">
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
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
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
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
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
            
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">About the System</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our Intelligent Fire Detection System utilizes state-of-the-art YOLOv8 architecture, 
                trained on a comprehensive dataset of fire incidents. The system can identify fires 
                with high accuracy across various environments and conditions, providing rapid detection 
                for enhanced safety and response times.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-2">Real-time Detection</h4>
                  <p className="text-xs text-slate-400">Instant analysis of uploaded images with precise fire detection</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-2">High Accuracy</h4>
                  <p className="text-xs text-slate-400">Advanced AI model trained on diverse fire scenarios</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;