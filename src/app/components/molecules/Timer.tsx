import TimeDigits from "../atoms/TimeDigits";
import { useState, useEffect } from "react";
import convertMinutesToHours from "@/app/utils/convertMinutesToHours";
import Button from "../atoms/Button";

const Timer = ({
  title,
  initialTimeMinutes,
}: {
  title: string;
  initialTimeMinutes: number;
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const { hours: initialHours, minutes: initialMinutes } =
    convertMinutesToHours(initialTimeMinutes);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setHours(initialHours);
    setMinutes(initialMinutes);
  }, [initialHours, initialMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && (hours > 0 || minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
        }
      }, 1000);
    } else if (!isRunning && interval !== null) {
      clearInterval(interval);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isRunning, hours, minutes, seconds]);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(initialMinutes);
    setHours(initialHours);
  };

  const handleSkip = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(initialMinutes);
    setHours(initialHours);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      <div className="flex flex-grow space-x-4 w-72 justify-center">
        <TimeDigits label="Hours" time={hours} />
        <TimeDigits label="Minutes" time={minutes} />
        <TimeDigits label="Seconds" time={seconds} />
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: "50%" }}
        ></div>
      </div>
      <div className="flex space-x-4 mt-4">
        <Button onClick={handleStart} color="blue">
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={handleStop} color="red">
          Stop
        </Button>
        <Button onClick={handleSkip} color="yellow">
          Skip
        </Button>
      </div>
    </div>
  );
};

export default Timer;
