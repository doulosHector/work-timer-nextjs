import { formatDigits } from "@/utils/formatTime";

const TimeDigits = ({ label, time }: { label: string; time: number }) => {
  return (
    <div className="flex flex-col items-center justify-center w-24">
      <span className="text-6xl font-bold">{formatDigits(time)}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default TimeDigits;
