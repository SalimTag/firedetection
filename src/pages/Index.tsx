import { useState } from "react";
import { Upload, Flame, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    // TODO: Implement API call to your FastAPI backend
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Detection Complete",
        description: "Fire detected with 95% confidence",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <Flame className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Fire Detection AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image to test our advanced fire detection model. 
            Get instant results with precision scores and detection visualization.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                disabled={!image || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Processing..." : "Detect Fire"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">
                About the Model
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This AI model is trained on thousands of fire images and can detect
                fires with high precision. It uses advanced computer vision
                techniques to identify potential fire hazards in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;