/**
 * Detection Results Component
 * @author Salim Tagemouati
 * @description Displays detection results with confidence scores
 */

/**
 * Prediction object structure
 */
interface Prediction {
  confidence: number;
  class: string;
}

/**
 * Props for DetectionResults component
 */
interface DetectionResultsProps {
  predictions: Prediction[] | null;
}

/**
 * Displays formatted detection results
 * @param {DetectionResultsProps} props - Component props
 * @returns {JSX.Element | null} Detection results or null if no predictions
 */
export const DetectionResults = ({ predictions }: DetectionResultsProps) => {
  if (!predictions) return null;

  return (
    <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-2">Detection Results</h3>
      <p className="text-slate-300">
        Found {predictions.length} potential fire instances
      </p>
      {predictions.map((pred, index) => (
        <div key={index} className="mt-2 text-sm text-slate-400">
          <p>Confidence: {(pred.confidence * 100).toFixed(2)}%</p>
          <p>Class: {pred.class}</p>
        </div>
      ))}
    </div>
  );
};