"use client";
import { useState } from "react";
import Timer from "../components/molecules/Timer";
import Settings from "../components/molecules/Settings";
import TrackedTime from "../components/molecules/TrackedTime";
import TimeLeft from "../components/molecules/TimeLeft";
import useWeekTrackedTime from "@/hooks/useWeekTrackedTime";
import WeeklyReport from "@/components/molecules/WeeklyReport";

export default function Home() {
  const [targetMinutes, setTargetMinutes] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [activeTimer, setActiveTimer] = useState<"work" | "break">("work");
  const [isRunning, setIsRunning] = useState(false);
  const [trackedSeconds, setTrackedSeconds] = useState(0);
  const { trackTodaySeconds, weekTrackedSeconds } = useWeekTrackedTime();
  const secondsLeft = targetMinutes * 60 - trackedSeconds;

  const trackSeconds = (seconds: number) => {
    setTrackedSeconds(trackedSeconds + seconds);
    trackTodaySeconds(trackedSeconds + seconds);
  };

  const setSettings = (type: string, value: number) => {
    if (type === "targetMinutes") {
      setTargetMinutes(value);
    } else if (type === "workMinutes") {
      setWorkMinutes(value);
    } else if (type === "breakMinutes") {
      setBreakMinutes(value);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        {activeTimer === "work" ? (
          <Timer
            title="Work Session"
            initialTimeMinutes={workMinutes}
            setActiveTimer={setActiveTimer}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            trackSeconds={trackSeconds}
          />
        ) : (
          <Timer
            title="Break Session"
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
          workMinutes={workMinutes}
          breakMinutes={breakMinutes}
          setSettings={setSettings}
          isRunning={isRunning}
        />
        <WeeklyReport weekTrackedSeconds={weekTrackedSeconds} />
      </div>
    </main>
  );
}
