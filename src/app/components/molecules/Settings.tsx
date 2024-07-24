import { useEffect } from "react";
import RangeInput from "../atoms/RangeInput";
import { getItem, setItem } from "@/app/utils/localStorage";

const Settings = ({
  targetMinutes,
  workMinutes,
  breakMinutes,
  setSettings,
  isRunning,
}: {
  targetMinutes: number;
  workMinutes: number;
  breakMinutes: number;
  setSettings: (type: string, value: number) => void;
  isRunning: boolean;
}) => {
  useEffect(() => {
    setSettings("targetMinutes", getItem("targetMinutes") || 0);
    setSettings("workMinutes", getItem("workMinutes") || 0);
    setSettings("breakMinutes", getItem("breakMinutes") || 0);
  }, [setSettings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = parseInt(e.target.value);
    if (type === "targetMinutes") {
      setSettings(type, value);
      setItem("targetMinutes", value);
    } else if (type === "workMinutes") {
      setSettings(type, value);
      setItem("workMinutes", value);
    } else if (type === "breakMinutes") {
      setSettings(type, value);
      setItem("breakMinutes", value);
    }
  };

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
        onChange={(e) => handleChange(e, "targetMinutes")}
        disabled={isRunning}
      />
      <RangeInput
        id="work-time"
        label="Work Time"
        min={0}
        max={60}
        step={5}
        value={workMinutes}
        onChange={(e) => handleChange(e, "workMinutes")}
        disabled={isRunning}
      />
      <RangeInput
        id="break-time"
        label="Break Time"
        min={0}
        max={60}
        step={5}
        value={breakMinutes}
        onChange={(e) => handleChange(e, "breakMinutes")}
        disabled={isRunning}
      />
    </div>
  );
};

export default Settings;
