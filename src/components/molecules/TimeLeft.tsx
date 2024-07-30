import { convertSecondsToHours } from "@/utils/convertSecondsToHours";
import { formatTime } from "@/utils/formatTime";

interface Props {
  secondsLeft: number;
}

const TimeLeft = ({ secondsLeft }: Props) => {
  const { hours, minutes, seconds } = convertSecondsToHours(secondsLeft);
  return <p>Time left: {formatTime(hours, minutes, seconds)}</p>;
};

export default TimeLeft;
