import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Database, Brain } from "lucide-react";

export const TrainingDatasetInfo = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-500" />
          Training Dataset Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-emerald-500 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-white">Model Version</h4>
              <p className="text-sm text-slate-400">YOLO Version 8</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Database className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-white">Dataset Size</h4>
              <p className="text-sm text-slate-400">1000+ annotated images</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Brain className="w-5 h-5 text-rose-500 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-white">Training Accuracy</h4>
              <p className="text-sm text-slate-400">95% mAP@0.5</p>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <p className="text-sm text-slate-300">
            This model was trained on a diverse dataset of fire incidents, including various lighting conditions and environments. It's specifically optimized for early fire detection in both indoor and outdoor settings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};