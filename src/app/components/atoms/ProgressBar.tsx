const ProgressBar = ({
  progress,
  showPercentage = false,
}: {
  progress: number;
  showPercentage?: boolean;
}) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 mt-4">
      <div
        className={`h-3 rounded-full transition-all duration-500 ${
          progress < 100 ? "bg-blue-600" : "bg-green-600"
        }`}
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
