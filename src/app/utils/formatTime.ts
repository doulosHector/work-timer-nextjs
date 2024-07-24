export const formatDigits = (time: number) => {
  return time.toString().padStart(2, "0");
};

export const formatTime = (hours: number, minutes: number, seconds: number) => {
  const formattedHours = formatDigits(hours);
  const formattedMinutes = formatDigits(minutes);
  const formattedSeconds = formatDigits(seconds);
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
