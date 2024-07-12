import RangeInput from "../atoms/RangeInput";

const Settings = ({
  targetMinutes,
  setTargetMinutes,
  workMinutes,
  setWorkMinutes,
  breakMinutes,
  setBreakMinutes,
}: {
  targetMinutes: number;
  setTargetMinutes: (value: number) => void;
  workMinutes: number;
  setWorkMinutes: (value: number) => void;
  breakMinutes: number;
  setBreakMinutes: (value: number) => void;
}) => {
  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      <RangeInput
        id="target-time"
        label="Target Time"
        min={0}
        max={400}
        step={5}
        value={targetMinutes}
        onChange={(e) => setTargetMinutes(parseInt(e.target.value))}
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
  );
};

export default Settings;
