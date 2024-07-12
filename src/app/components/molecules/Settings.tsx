import { useState } from "react";
import RangeInput from "../atoms/RangeInput";
import Button from "../atoms/Button";

const Settings = ({
  targetMinutes,
  setTargetMinutes,
  workMinutes,
  setWorkMinutes,
  breakMinutes,
  setBreakMinutes,
  isRunning,
}: {
  targetMinutes: number;
  setTargetMinutes: (value: number) => void;
  workMinutes: number;
  setWorkMinutes: (value: number) => void;
  breakMinutes: number;
  setBreakMinutes: (value: number) => void;
  isRunning: boolean;
}) => {
  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      <RangeInput
        id="target-time"
        label="Target Time"
        min={0}
        max={400}
        step={5}
        value={targetMinutes}
        onChange={(e) => setTargetMinutes(parseInt(e.target.value))}
        disabled={isRunning}
      />
      <RangeInput
        id="work-time"
        label="Work Time"
        min={0}
        max={60}
        step={5}
        value={workMinutes}
        onChange={(e) => setWorkMinutes(parseInt(e.target.value))}
        disabled={isRunning}
      />
      <RangeInput
        id="break-time"
        label="Break Time"
        min={0}
        max={60}
        step={5}
        value={breakMinutes}
        onChange={(e) => setBreakMinutes(parseInt(e.target.value))}
        disabled={isRunning}
      />
    </div>
  );
};

export default Settings;
