/**
 * Feature Card Component
 * @author Salim Tagemouati
 * @description Displays a feature with icon, title, and description
 */

import { LucideIcon } from "lucide-react";

/**
 * Props for FeatureCard component
 */
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
}

/**
 * Displays a feature card with icon and description
 * @param {FeatureCardProps} props - Component props
 * @returns {JSX.Element} Feature card component
 */
export const FeatureCard = ({ icon: Icon, title, description, iconColor, bgColor }: FeatureCardProps) => {
  return (
    <div className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-slate-700 text-center">
      <div className={`inline-block p-3 ${bgColor} rounded-lg mb-4`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
};