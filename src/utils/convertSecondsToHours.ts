// Util to convert seconds to hours and minutes
export const convertSecondsToHours = (secondsParam: number) => {
  const minutes = Math.floor((secondsParam % 3600) / 60) || 0;
  const hours = Math.floor(secondsParam / 3600) || 0;
  const seconds = secondsParam % 60 || 0;
  return { hours, minutes, seconds };
};
