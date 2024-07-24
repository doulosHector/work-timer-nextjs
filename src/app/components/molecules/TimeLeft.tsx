import { convertSecondsToHours } from "@/app/utils/convertSecondsToHours";
import { formatTime } from "@/app/utils/formatTime";

interface Props {
  secondsLeft: number;
}

const TimeLeft = ({ secondsLeft }: Props) => {
  const { hours, minutes, seconds } = convertSecondsToHours(secondsLeft);
  return <p>Time left: {formatTime(hours, minutes, seconds)}</p>;
};

export default TimeLeft;
