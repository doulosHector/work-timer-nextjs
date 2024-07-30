// Util to convert seconds to hours and minutes
export const convertSecondsToHours = (secondsParam: number) => {
  const minutes = Math.floor((secondsParam % 3600) / 60);
  const hours = Math.floor(secondsParam / 3600);
  const seconds = secondsParam % 60;
  return { hours, minutes, seconds };
};
