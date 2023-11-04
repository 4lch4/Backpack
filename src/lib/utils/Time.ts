/**
 * Converts the given delay from a string indicating seconds or milliseconds to a number of
 * milliseconds. To specify which, add a suffix of either `s` or `ms`, e.g. `5000ms` or `5s`.
 *
 * - If the delay is already in milliseconds, it will be returned as-is.
 * - If the delay is in seconds, it will be converted to milliseconds.
 * - If the delay is in an unknown format, it will be converted to a number as is.
 *
 * @param delay The timeout delay in either seconds or milliseconds.
 * @returns The timeout delay in milliseconds.
 */
export function convertDelayToMs(delay: string): number {
  if (delay.endsWith('ms')) return parseInt(delay.replace('ms', ''))
  if (delay.endsWith('s')) return parseInt(delay.replace('s', '')) * 1000

  return parseInt(delay)
}
