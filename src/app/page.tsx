"use client";
import { useState } from "react";
import Timer from "./components/molecules/Timer";
import Settings from "./components/molecules/Settings";
import TrackedTime from "./components/molecules/TrackedTime";
import TimeLeft from "./components/molecules/TimeLeft";

export default function Home() {
  const [targetMinutes, setTargetMinutes] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [activeTimer, setActiveTimer] = useState<"work" | "break">("work");
  const [isRunning, setIsRunning] = useState(false);
  const [trackedSeconds, setTrackedSeconds] = useState(0);
  const secondsLeft = targetMinutes * 60 - trackedSeconds;

  const trackSeconds = (seconds: number) => {
    setTrackedSeconds((trackedSeconds) => trackedSeconds + seconds);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        {activeTimer === "work" ? (
          <Timer
            title="Work Time"
            initialTimeMinutes={workMinutes}
            setActiveTimer={setActiveTimer}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            trackSeconds={trackSeconds}
          />
        ) : (
          <Timer
            title="Break Time"
            initialTimeMinutes={breakMinutes}
            setActiveTimer={setActiveTimer}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
          />
        )}
        <TrackedTime
          trackedSeconds={trackedSeconds}
          targetSeconds={targetMinutes * 60}
        />
        <TimeLeft secondsLeft={secondsLeft} />
        <Settings
          targetMinutes={targetMinutes}
          setTargetMinutes={setTargetMinutes}
          workMinutes={workMinutes}
          setWorkMinutes={setWorkMinutes}
          breakMinutes={breakMinutes}
          setBreakMinutes={setBreakMinutes}
          isRunning={isRunning}
        />
      </div>
    </main>
  );
}
