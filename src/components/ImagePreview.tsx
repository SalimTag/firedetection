import { useState } from "react";

interface Prediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
}

interface ImagePreviewProps {
  preview: string | null;
  predictions: Prediction[] | null;
}

export const ImagePreview = ({ preview, predictions }: ImagePreviewProps) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  if (!preview) {
    return (
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Upload className="w-12 h-12 text-slate-400 mb-4" />
        <p className="mb-2 text-sm text-slate-300">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64">
      <img
        src={preview}
        alt="Preview"
        className="h-full w-full object-contain"
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          setImageSize({ width: img.width, height: img.height });
        }}
      />
      {predictions?.map((pred, index) => (
        <div
          key={index}
          className="absolute border-2 border-purple-500"
          style={{
            left: `${(pred.x - pred.width/2) / imageSize.width * 100}%`,
            top: `${(pred.y - pred.height/2) / imageSize.height * 100}%`,
            width: `${pred.width / imageSize.width * 100}%`,
            height: `${pred.height / imageSize.height * 100}%`,
          }}
        >
          <div className="absolute top-0 left-0 -translate-y-6 bg-purple-500 text-white px-2 py-1 text-xs rounded">
            {pred.class} ({(pred.confidence * 100).toFixed(1)}%)
          </div>
        </div>
      ))}
    </div>
  );
};