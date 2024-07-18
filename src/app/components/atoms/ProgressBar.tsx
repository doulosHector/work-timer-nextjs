const ProgressBar = ({
  progress,
  color,
  showPercentage = false,
}: {
  progress: number;
  color: "blue" | "red" | "yellow" | "green";
  showPercentage?: boolean;
}) => {
  const colorStyles = {
    blue: "bg-blue-600",
    red: "bg-red-600",
    yellow: "bg-yellow-600",
    green: "bg-green-600",
  };
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 mt-4">
      <div
        className={`h-3 rounded-full ${colorStyles[color]} transition-all duration-500`}
        style={{ width: `${progress}%` }}
      ></div>
      {showPercentage && (
        <p className="text-white text-center text-xs relative -top-3.5">
          {Math.round(progress)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
