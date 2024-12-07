import { TrainingDatasetInfo } from "@/components/TrainingDatasetInfo";
import { PerformanceChart } from "@/components/PerformanceChart";

export const MetricsSection = () => {
  return (
    <div className="space-y-8">
      <TrainingDatasetInfo />
      <PerformanceChart />
    </div>
  );
};