import convertMinutes from "@/app/utils/convertMinutesToHours";
import { formatTime } from "@/app/utils/formatTime";
import React from "react";

interface RangeInputProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RangeInput: React.FC<RangeInputProps> = ({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  disabled,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const { hours, minutes } = convertMinutes(value);

  return (
    <div className="flex flex-col items-center">
      <label className="text-sm" htmlFor={id}>
        {label} : {formatTime(hours, minutes, 0)}
      </label>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className="w-full h-2 mt-2 bg-gray-200 rounded-lg"
        disabled={disabled}
      />
    </div>
  );
};

export default RangeInput;
