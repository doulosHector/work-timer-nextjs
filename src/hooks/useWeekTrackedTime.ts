import { useEffect, useState } from "react";
import { getItem, setItem } from "@/utils/localStorage";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

/**
 * Custom hook to track time spent during the current week.
 *
 * This hook:
 * - Initializes and manages the state for tracked seconds.
 * - Checks if the current date is in a different week compared to the stored date.
 * - Resets the tracked time if the week has changed.
 * - Provides a function to update the tracked week time.
 *
 * Returns an object with the following properties:
 *   - trackSeconds: A function to add seconds to the tracked week time.
 *   - weekTrackedSeconds: The number of seconds tracked for each day of the week.
 */
const useWeekTrackedTime = () => {
  const [weekTrackedSeconds, setWeekTrackedSeconds] = useState<number[]>([]);
  const date = new Date();
  const day = date.getDay();

  useEffect(() => {
    const currentWeekOfYear = getItem("currentWeekOfYear");
    // If the current week is different from the stored week, reset the week tracked seconds
    if (!currentWeekOfYear || currentWeekOfYear !== dayjs().week()) {
      const weekSeconds: number[] = new Array(7).fill(0);
      setItem("weekTrackedSeconds", JSON.stringify(weekSeconds));
      setItem("currentWeekOfYear", dayjs().week());
    }
  }, [day]);

  const trackTodaySeconds = (seconds: number) => {
    const weekSeconds: number[] = JSON.parse(
      getItem("weekTrackedSeconds") || "[]"
    );
    weekSeconds[day] = seconds;
    setItem("weekTrackedSeconds", JSON.stringify(weekSeconds));
    setWeekTrackedSeconds(weekSeconds);
  };

  return { trackTodaySeconds, weekTrackedSeconds };
};

export default useWeekTrackedTime;
