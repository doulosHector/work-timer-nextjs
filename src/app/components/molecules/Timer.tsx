import TimeDigits from "../atoms/TimeDigits";

const Timer = ({
  title,
  hours,
  minutes,
  seconds,
}: {
  title: string;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      <div className="flex flex-grow space-x-4 w-72 justify-center">
        <TimeDigits label="Hours" time={hours} />
        <TimeDigits label="Minutes" time={minutes} />
        <TimeDigits label="Seconds" time={seconds} />
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: "50%" }}
        ></div>
      </div>
    </>
  );
};

export default Timer;
