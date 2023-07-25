export function displayScore(
  { score, total_score, submitted_at, created_at },
  durationInMinutes: number,
) {
  const seconds = Math.floor(
    ((submitted_at ? +new Date(submitted_at) : +new Date()) -
      +new Date(created_at)) /
      1000,
  ); // Calculate the time elapsed in seconds
  const minutes = Math.floor(seconds / 60);

  if (!submitted_at && seconds < durationInMinutes * 60) {
    if (minutes === 0) {
      return `⏳ just have started`;
    }
    return `⏳ ${minutes} minutes`;
  }
  if (minutes === 0) {
    return `${score}/${total_score} | ${seconds} seconds`;
  }
  return `${score}/${total_score} | ${
    Math.min(
      minutes,
      durationInMinutes,
    )
  } minutes`;
}

export function timeElapsed(started_at: Date, durationInMinutes: number) {
  const now = new Date(); // Get the current time
  const elapsedTime = Math.floor(now.getTime() - started_at.getTime()); // Calculate the elapsed time in seconds
  const totalDuration = durationInMinutes * 60 * 1000; // Calculate the total duration of the exam in seconds
  const remainingTimeInSeconds = totalDuration - elapsedTime; // Calculate the remaining time in seconds
  return Math.max(remainingTimeInSeconds, 0); // Return the remaining time in seconds
}
