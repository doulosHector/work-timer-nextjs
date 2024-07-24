import { convertSecondsToHours } from "@/app/utils/convertSecondsToHours";
import ProgressBar from "../atoms/ProgressBar";
import { formatTime } from "@/app/utils/formatTime";

const TrackedTime = ({
  trackedSeconds,
  targetSeconds,
}: {
  trackedSeconds: number;
  targetSeconds: number;
}) => {
  const { hours, minutes, seconds } = convertSecondsToHours(trackedSeconds);
  const secondsQuotient = trackedSeconds / targetSeconds;
  const progress =
    secondsQuotient && secondsQuotient < Infinity ? secondsQuotient * 100 : 0;
  return (
    <div>
      <p>Tracked time: {formatTime(hours, minutes, seconds)}</p>
      <ProgressBar progress={progress} showPercentage={true} />
    </div>
  );
};

export default TrackedTime;
