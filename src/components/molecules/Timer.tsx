import TimeDigits from "../atoms/TimeDigits";
import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import ProgressBar from "../atoms/ProgressBar";
import { convertSecondsToHours } from "@/utils/convertSecondsToHours";
import { formatTime } from "@/utils/formatTime";
import useNotification from "@/hooks/useNotification";

interface TimerProps {
  title: string;
  initialTimeMinutes: number;
  isWorkSession: boolean;
  setIsWorkSession: (isWorkSession: boolean) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  trackSeconds?: (seconds: number) => void;
}

const Timer = ({
  title,
  initialTimeMinutes,
  isWorkSession,
  setIsWorkSession,
  isRunning,
  setIsRunning,
  trackSeconds,
}: TimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [countingMode, setCountingMode] = useState<"down" | "up">("down");
  const { hours, minutes, seconds } = convertSecondsToHours(secondsLeft);
  const initialTimeSeconds = initialTimeMinutes * 60;
  const progress =
    secondsLeft > 0
      ? parseFloat((100 - (secondsLeft / initialTimeSeconds) * 100).toFixed(2))
      : 0;
  if (typeof window !== "undefined") {
    document.title = `${title} - ${formatTime(hours, minutes, seconds)}`;
  }
  const { sendNotification } = useNotification();

  useEffect(() => {
    setSecondsLeft(initialTimeSeconds);
  }, [initialTimeSeconds]);

  useEffect(() => {
    if (isRunning) {
      if (secondsLeft === 0) {
        sendNotification(`${title} completed!`);
        setCountingMode("up");
      } else if (
        secondsLeft > 0 &&
        secondsLeft % 300 === 0 &&
        countingMode === "up"
      ) {
        sendNotification(
          "Timer Alert",
          `Five minutes elapsed since ${title} ended`
        );
      }
    }
  }, [isRunning, secondsLeft, title, sendNotification, countingMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
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
  }, [isRunning, countingMode]);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(initialTimeSeconds);
    setCountingMode("down");
    setSecondsElapsed(0);
    setIsWorkSession(!isWorkSession);
  };

  const handleFinish = () => {
    if (trackSeconds) {
      trackSeconds(secondsElapsed);
    }
    resetTimer();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex flex-grow space-x-4 w-72 justify-center">
        <TimeDigits label="Hours" time={hours} />
        <TimeDigits label="Minutes" time={minutes} />
        <TimeDigits label="Seconds" time={seconds} />
      </div>
      <ProgressBar
        progress={countingMode === "down" ? progress : 100}
        showPercentage
      />
      <div className="flex space-x-4 mt-4">
        <Button onClick={handleStart} color="blue" disabled={secondsLeft === 0}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={handleFinish} color="green" disabled={!isRunning}>
          Finish
        </Button>
        <Button onClick={resetTimer} color="orange">
          Skip
        </Button>
      </div>
    </div>
  );
};

export default Timer;
