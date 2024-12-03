import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", accuracy: 92 },
  { name: "Feb", accuracy: 94 },
  { name: "Mar", accuracy: 95 },
  { name: "Apr", accuracy: 96 },
  { name: "May", accuracy: 97 },
];

export const PerformanceChart = () => {
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-lg border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Model Performance</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "0.375rem",
              }}
              labelStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};