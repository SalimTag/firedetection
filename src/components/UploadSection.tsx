import { useState } from "react";
import { UploadCloud, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ImagePreview } from "@/components/ImagePreview";
import { DetectionResults } from "@/components/DetectionResults";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Roboflow configuration
const ROBOFLOW_API_KEY = "MjbWNTPIJJkZrHJOseFr";
const ROBOFLOW_MODEL = "fire-detection-g9ebb/8";
const ROBOFLOW_API_URL = `https://detect.roboflow.com/${ROBOFLOW_MODEL}`;

export const UploadSection = () => {
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

  const handleSubmit = async () => {
    if (!image) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', image);

      console.log("Sending request to Roboflow API...");
      
      const response = await fetch(`${ROBOFLOW_API_URL}?api_key=${ROBOFLOW_API_KEY}&confidence=40&overlap=30`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Roboflow API response:", result);
      
      // Transform the predictions if needed
      if (result.predictions) {
        result.predictions = result.predictions.map((pred: any) => ({
          ...pred,
          confidence: pred.confidence || 0.805, // Use provided confidence or default
          class: pred.class || "fire",
        }));
      }
      
      setDetectionResult(result);
      
      if (result.predictions && result.predictions.length > 0) {
        toast({
          title: "Detection Complete",
          description: `Found ${result.predictions.length} potential fire instances`,
        });
      } else {
        toast({
          title: "No Fire Detected",
          description: "No fire instances were detected in this image",
        });
      }
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
    <Card className="p-6 md:p-8 bg-slate-800/50 backdrop-blur-lg border-slate-700 transition-all hover:bg-slate-800/60">
      <div className="space-y-6">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer border-slate-600 hover:border-purple-500 transition-colors bg-slate-900/50"
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
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
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
              <RefreshCw className="mr-2 h-4 w-4" />
              Upload Another Image
            </Button>
          )}
        </div>

        <DetectionResults predictions={detectionResult?.predictions} />
      </div>
    </Card>
  );
};