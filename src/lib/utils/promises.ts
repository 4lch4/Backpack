import { convertDelayToMs } from './Time.js'

/** The input to the `promiseTimeout` function. */
export type PromiseTimeoutInput = {
  /**
   * The timeout delay in either seconds or milliseconds. To specify which, add a suffix of either
   * `s` or `ms`, e.g. `5000ms` or `5s`.
   */
  delay: string,

  /** The promise to execute but reject if it runs longer than the specified `delay`. */
  promise: Promise<any>,

  /** The message to use in the rejection error. */
  message?: string,
}

/**
 * Executes the given promise but rejects it if it takes longer than the specified delay.
 *
 * - The delay can be specified in either seconds or milliseconds.
 *   - To specify which, add a suffix of either `s` or `ms`, e.g. `5000ms` or `5s`.
 *   - If no suffix is provided, the delay is assumed to be in milliseconds.
 * - You can also provide a custom message to use in the rejection error.
 *   - If none is provided then `Promise timed out after ${delay}ms` will be used as the default.
 *
 * @param input The required info for the function to execute.
 *
 * @returns The promise that will either resolve with the result of the input promise or reject with an error if the input promise takes longer than the specified delay.
 */
export function promiseTimeout<T>(input: PromiseTimeoutInput): Promise<T> {
  return new Promise((resolve, reject) => {
    const delay = convertDelayToMs(input.delay)
    const timeoutId = setTimeout(() => {
      reject(new Error(input.message || `Promise timed out after ${delay}ms`))
    }, delay)

    input.promise
      .then(res => {
        clearTimeout(timeoutId)
        resolve(res)
      })
      .catch(err => {
        clearTimeout(timeoutId)
        reject(err)
      })
  })
}
