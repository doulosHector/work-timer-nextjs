"use client";
import { useState, useEffect } from "react";
import RangeInput from "./components/atoms/RangeInput";

export default function Home() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [targetMinutes, setTargetMinutes] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && (hours > 0 || minutes > 0 || seconds > 0)) {
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
    } else if (!isActive && interval !== null) {
      clearInterval(interval);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isActive, hours, minutes, seconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  };

  const handleSkip = () => {
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(e.target.value);
    const { hours, minutes } = convertMinutesToHoursAndMinutes(value);
    setHours(hours);
    setMinutes(minutes);
    setTargetMinutes(value);
  };

  const formatTime = (time: number): string => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  const convertMinutesToHoursAndMinutes = (
    totalMinutes: number
  ): { hours: number; minutes: number } => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Countdown Timer</h1>
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold text-gray-800">
              {formatTime(hours)}
            </span>
            <span className="text-sm text-gray-500">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold text-gray-800">
              {formatTime(minutes)}
            </span>
            <span className="text-sm text-gray-500">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold text-gray-800">
              {formatTime(seconds)}
            </span>
            <span className="text-sm text-gray-500">Seconds</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={handleStop}
          >
            Stop
          </button>
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <RangeInput
            id="target-minutes"
            label="Target Minutes"
            min={0}
            max={400}
            step={5}
            value={targetMinutes}
            onChange={handleMinutesChange}
          />
          <RangeInput
            id="work-minutes"
            label="Work Minutes"
            min={0}
            max={60}
            step={5}
            value={workMinutes}
            onChange={(e) => setWorkMinutes(parseInt(e.target.value))}
          />
          <RangeInput
            id="break-minutes"
            label="Break Minutes"
            min={0}
            max={60}
            step={5}
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(parseInt(e.target.value))}
          />
        </div>
      </div>
    </main>
  );
}
