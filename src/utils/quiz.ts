export function displayScore(
  { score, total_score, submitted_at, created_at },
  durationInMinutes: number
) {
  const minutes = Math.floor(
    ((submitted_at ? +new Date(submitted_at) : +new Date()) -
      +new Date(created_at)) /
      60000
  ); // Calculate the time elapsed in minutes
  if (!submitted_at && minutes < durationInMinutes) {
    return `⏳ ${minutes} minutes`;
  }
  return `${score}/${total_score} | ${Math.min(
    minutes,
    durationInMinutes
  )} minutes`;
}

export function timeElapsed(started_at: Date, durationInMinutes: number) {
  const now = new Date(); // Get the current time
  const elapsedTime = Math.floor(now.getTime() - started_at.getTime()); // Calculate the elapsed time in seconds
  const totalDuration = durationInMinutes * 60 * 1000; // Calculate the total duration of the exam in seconds
  const remainingTimeInSeconds = totalDuration - elapsedTime; // Calculate the remaining time in seconds
  return Math.max(remainingTimeInSeconds, 0); // Return the remaining time in seconds
}
