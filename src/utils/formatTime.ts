export const formatDigits = (time: number) => {
  return time.toString().padStart(2, "0");
};

export const formatTime = (
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0
) => {
  const formattedHours = formatDigits(hours);
  const formattedMinutes = formatDigits(minutes);
  const formattedSeconds = formatDigits(seconds);
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
