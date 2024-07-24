import { formatDigits } from "@/app/utils/formatTime";

const TimeDigits = ({ label, time }: { label: string; time: number }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-6xl font-bold text-gray-800">
        {formatDigits(time)}
      </span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
};

export default TimeDigits;
