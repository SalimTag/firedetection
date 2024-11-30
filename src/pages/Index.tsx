import { useState } from "react";
import { Upload, Flame, AlertCircle, Camera, Shield, Leaf } from "lucide-react";
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
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Detection Complete",
        description: "Fire detected with 95% confidence",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center space-y-6 animate-fade-up">
          <div className="inline-block p-4 bg-purple-500/10 rounded-full mb-4">
            <Flame className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white max-w-4xl mx-auto leading-tight">
            Intelligent Fire Detection System
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Protecting environments with advanced AI technology. Upload images to detect fire and smoke with high precision.
          </p>
        </div>

        {/* Upload Card */}
        <Card className="mt-12 p-8 bg-white/5 backdrop-blur-lg border-slate-700 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-slate-800/50"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-slate-400 mb-4" />
                    <p className="mb-2 text-sm text-slate-300">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
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

            <Button
              onClick={handleSubmit}
              disabled={!image || isLoading}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              {isLoading ? "Processing..." : "Analyze Image"}
            </Button>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-slate-700 text-center">
            <div className="inline-block p-3 bg-emerald-500/10 rounded-lg mb-4">
              <Camera className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Detection</h3>
            <p className="text-slate-300">Advanced computer vision for instant fire and smoke detection</p>
          </div>
          
          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-slate-700 text-center">
            <div className="inline-block p-3 bg-blue-500/10 rounded-lg mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">High Accuracy</h3>
            <p className="text-slate-300">Precise detection with minimal false positives</p>
          </div>
          
          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-slate-700 text-center">
            <div className="inline-block p-3 bg-rose-500/10 rounded-lg mb-4">
              <Leaf className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Environmental Protection</h3>
            <p className="text-slate-300">Early detection to prevent environmental damage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;