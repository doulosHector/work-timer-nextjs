"use client";
import { useState } from "react";
import Timer from "./components/molecules/Timer";
import Settings from "./components/molecules/Settings";

export default function Home() {
  const [targetMinutes, setTargetMinutes] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Timer title="Work Time" initialTimeMinutes={workMinutes} />
        <Timer title="Break Time" initialTimeMinutes={breakMinutes} />
        <Settings
          targetMinutes={targetMinutes}
          setTargetMinutes={setTargetMinutes}
          workMinutes={workMinutes}
          setWorkMinutes={setWorkMinutes}
          breakMinutes={breakMinutes}
          setBreakMinutes={setBreakMinutes}
        />
      </div>
    </main>
  );
}
