/**
 * Image Preview Component with Detection Visualization
 * @author Salim Tagemouati
 * @description Displays uploaded image with bounding boxes for detected fire/smoke
 */

import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";

/**
 * Prediction object from Roboflow API
 */
interface Prediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
}

/**
 * Props for ImagePreview component
 */
interface ImagePreviewProps {
  preview: string | null;
  predictions: Prediction[] | null;
}

/**
 * Displays image preview with detection bounding boxes
 * @param {ImagePreviewProps} props - Component props
 * @returns {JSX.Element} Image preview with detection overlays
 */
export const ImagePreview = ({ preview, predictions }: ImagePreviewProps) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (containerRef.current && imageSize.width && imageSize.height) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const scaleX = containerWidth / imageSize.width;
      const scaleY = containerHeight / imageSize.height;
      setScale(Math.min(scaleX, scaleY));
    }
  }, [imageSize, containerRef.current]);

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
    <div ref={containerRef} className="relative w-full h-64 overflow-hidden">
      <img
        src={preview}
        alt="Preview"
        className="h-full w-full object-contain"
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
        }}
      />
      {predictions?.map((pred, index) => {
        const x = (pred.x - pred.width/2) * scale;
        const y = (pred.y - pred.height/2) * scale;
        const width = pred.width * scale;
        const height = pred.height * scale;
        
        return (
          <div
            key={index}
            className="absolute border-2 border-purple-500"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${width}px`,
              height: `${height}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute top-0 left-0 -translate-y-6 bg-purple-500 text-white px-2 py-1 text-xs rounded whitespace-nowrap">
              {pred.class} ({(pred.confidence * 100).toFixed(1)}%)
            </div>
          </div>
        );
      })}
    </div>
  );
};