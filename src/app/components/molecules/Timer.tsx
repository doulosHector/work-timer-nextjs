import TimeDigits from "../atoms/TimeDigits";
import { useState, useEffect } from "react";
import convertMinutesToHours from "@/app/utils/convertMinutesToHours";
import Button from "../atoms/Button";
import ProgressBar from "../atoms/ProgressBar";
import { convertSecondsToHours } from "@/app/utils/convertSecondsToHours";

const Timer = ({
  title,
  initialTimeMinutes,
  setActiveTimer,
  isRunning,
  setIsRunning,
  trackSeconds,
}: {
  title: string;
  initialTimeMinutes: number;
  setActiveTimer: (timer: "work" | "break") => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  trackSeconds?: (seconds: number) => void;
}) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [countingMode, setCountingMode] = useState<"down" | "up">("down");
  const { hours, minutes, seconds } = convertSecondsToHours(secondsLeft);
  const initialTimeSeconds = initialTimeMinutes * 60;
  const progress =
    secondsLeft > 0
      ? parseFloat((100 - (secondsLeft / initialTimeSeconds) * 100).toFixed(2))
      : 0;

  useEffect(() => {
    setSecondsLeft(initialTimeSeconds);
  }, [initialTimeSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      if (secondsLeft === 0) {
        setCountingMode("up");
      }
      interval = setInterval(() => {
        if (countingMode === "down") {
          setSecondsLeft((prev) => prev - 1);
        } else {
          setSecondsLeft((prev) => prev + 1);
        }
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && interval !== null) {
      clearInterval(interval);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isRunning, secondsLeft, countingMode]);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setSecondsLeft(initialTimeSeconds);
    setCountingMode("down");
    setActiveTimer(title === "Work Time" ? "break" : "work");
    if (trackSeconds) {
      trackSeconds(secondsElapsed);
    }
    setSecondsElapsed(0);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      <div className="flex flex-grow space-x-4 w-72 justify-center">
        <TimeDigits label="Hours" time={hours} />
        <TimeDigits label="Minutes" time={minutes} />
        <TimeDigits label="Seconds" time={seconds} />
      </div>
      <ProgressBar progress={countingMode === "down" ? progress : 100} />
      <div className="flex space-x-4 mt-4">
        <Button onClick={handleStart} color="blue" disabled={secondsLeft === 0}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={stopTimer} color="green" disabled={!isRunning}>
          Finish
        </Button>
        <Button onClick={stopTimer} color="yellow">
          Skip
        </Button>
      </div>
    </div>
  );
};

export default Timer;
