import React from "react";

interface RangeInputProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <label className="text-sm text-gray-500" htmlFor={id}>
        {label} : {value}
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
      />
    </div>
  );
};

export default RangeInput;
