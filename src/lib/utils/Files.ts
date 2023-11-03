import Day from 'dayjs'

/**
 * Prepends a timestamp to a filename in the format of YYYY-MM-DDTHH-mm-ss.
 *
 * @param filename The filename to prepend a timestamp on.
 * @returns A timestamped filename.
 *
 * @example
 * timestampedFilename('test.txt') // 2021-01-01T00-00-00-test.txt
 */
export function timestampedFilename(filename: string) {
  return `${Day().format('YYYY-MM-DDTHH-mm-ss')}-${filename}`
}
