"use client";
import { useState, useEffect } from "react";
import RangeInput from "./components/atoms/RangeInput";
import Timer from "./components/molecules/Timer";
import Button from "./components/atoms/Button";
import convertMinutes from "./utils/convertMinutes";

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
    setIsActive(!isActive);
  };

  const handleStop = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  };

  const handleSkip = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(e.target.value);
    const { hours, minutes } = convertMinutes(value);
    setHours(hours);
    setMinutes(minutes);
    setTargetMinutes(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Timer
          title="Work Timer"
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
        <div className="flex space-x-4 mt-4">
          <Button onClick={handleStart} color="blue">
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={handleStop} color="red">
            Stop
          </Button>
          <Button onClick={handleSkip} color="yellow">
            Skip
          </Button>
        </div>
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <RangeInput
            id="target-time"
            label="Target Time"
            min={0}
            max={400}
            step={5}
            value={targetMinutes}
            onChange={handleTargetChange}
          />
          <RangeInput
            id="work-time"
            label="Work Time"
            min={0}
            max={60}
            step={5}
            value={workMinutes}
            onChange={(e) => setWorkMinutes(parseInt(e.target.value))}
          />
          <RangeInput
            id="break-time"
            label="Break Time"
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
