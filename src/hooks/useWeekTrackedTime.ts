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
 * - Provides a function to update the tracked time.
 *
 * Returns an object with the following properties:
 *   - trackedSeconds: The number of seconds tracked for the current day.
 *   - trackSeconds: A function to add seconds to the tracked time.
 */
const useWeekTrackedTime = () => {
  const [trackedSeconds, setTrackedSeconds] = useState(0);
  const date = new Date();
  const day = date.getDay();

  useEffect(() => {
    const currentWeekOfYear = getItem("currentWeekOfYear");

    if (!currentWeekOfYear || currentWeekOfYear !== dayjs().week()) {
      // Reset tracked time for the new week
      const weekTrackedSeconds: number[] = new Array(7).fill(0);
      setItem("weekTrackedSeconds", JSON.stringify(weekTrackedSeconds));
      setItem("currentWeekOfYear", dayjs().week());
    }

    const weekTrackedSeconds: number[] = JSON.parse(
      getItem("weekTrackedSeconds") || "[]"
    );
    const todayTrackedSeconds = weekTrackedSeconds[day] || 0;
    setTrackedSeconds(todayTrackedSeconds);
  }, [day]);

  const trackSeconds = (seconds: number) => {
    setTrackedSeconds(trackedSeconds + seconds);
    const weekTrackedSeconds: number[] = JSON.parse(
      getItem("weekTrackedSeconds") || "[]"
    );
    weekTrackedSeconds[day] = trackedSeconds + seconds;
    setItem("weekTrackedSeconds", JSON.stringify(weekTrackedSeconds));
  };

  return { trackedSeconds, trackSeconds };
};

export default useWeekTrackedTime;
