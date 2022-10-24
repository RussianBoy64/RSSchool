export default function timeFormatter(seconds) {
  if (seconds === null) return false

  const minStr = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const secStr = (seconds % 60).toString().padStart(2, '0')

  return `${minStr}:${secStr}`
}
