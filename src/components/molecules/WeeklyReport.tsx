import { useEffect, useState } from "react";
import { getItem } from "@/utils/localStorage";
import { convertSecondsToHours } from "@/utils/convertSecondsToHours";
import { formatTime } from "@/utils/formatTime";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const WeeklyReport = ({
  weekTrackedSeconds,
}: {
  weekTrackedSeconds: number[];
}) => {
  const [totalTrackedSeconds, setTotalTrackedSeconds] = useState(0);
  const { hours, minutes, seconds } =
    convertSecondsToHours(totalTrackedSeconds);

  useEffect(() => {
    const totalSeconds = weekTrackedSeconds.reduce(
      (acc: number, curr: number) => acc + curr,
      0
    );
    setTotalTrackedSeconds(totalSeconds);
  }, [weekTrackedSeconds]);

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const weekData = weekTrackedSeconds.map((seconds: number, index: number) => ({
    date: days[index],
    minutes: Math.round((seconds / 60) * 10) / 10,
  }));

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Weekly Tracked Time</h2>
      <p>Total Tracked Time: {formatTime(hours, minutes, seconds)}</p>
      <BarChart
        id="weekly-report"
        width={300}
        height={150}
        data={weekData}
        margin={{ left: -20 }}
      >
        <XAxis dataKey="date" stroke="#eeeeee" />
        <YAxis stroke="#eeeeee" />
        <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
        <Bar dataKey="minutes" fill="#0284c7" />
      </BarChart>
    </div>
  );
};

export default WeeklyReport;
