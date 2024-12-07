import { useState } from "react";
import { UploadCloud, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ImagePreview } from "@/components/ImagePreview";
import { DetectionResults } from "@/components/DetectionResults";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const ROBOFLOW_API_KEY = "MjbWNTPIJJkZrHJOseFr";
const ROBOFLOW_MODEL = "fire-detection-g9ebb/8";

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
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
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