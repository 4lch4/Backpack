import Table from 'cli-table'
import { Elysia, HTTPMethod, InternalRoute } from 'elysia'
import * as pc from 'picocolors'

/** An interface for the options that can be passed to the {@link printRoutes} function. */
export interface PrintRoutesOptions {
  /**
   * If set to true, each method will be on its own row. If set to false, all methods will be on
   * the same row, separated by the {@link PrintRoutesOptions.multiMethodSeparator | multiMethodSeparator}
   * option.
   *
   * For example, if this is set to `true`, and the route `/foo` has a `GET` and a `POST` method,
   * then `/foo` will have one row with `GET` and `POST` in the "Method(s)" column separated by the
   * {@link PrintRoutesOptions.multiMethodSeparator | multiMethodSeparator} value.
   *
   * @default false
   */
  multiMethodRows?: boolean

  /**
   * If {@link PrintRoutesOptions.multiMethodRows | multiMethodRows} is set to `true`, then this
   * value will be used to separate the methods in the "Method(s)" column.
   */
  multiMethodSeparator?: string
}

function colorMethod(method: HTTPMethod): string {
  switch (method) {
    case 'GET':
      return pc.green(method)
    case 'POST':
      return pc.blue(method)
    case 'PUT':
      return pc.yellow(method)
    case 'PATCH':
      return pc.cyan(method)
    case 'DELETE':
      return pc.red(method)
    default:
      return method
  }
}
/**
 * Builds a {@link Table} object from the given {@link InternalRoute | InternalRoutes} where
 * each method of a route is on the **same** row.
 *
 * @param routes The {@link InternalRoute | InternalRoutes} to print.
 * @param separator The separator to use between methods in the "Method(s)" column.
 *
 * @returns A {@link Table} object that can be printed to the console.
 */
function buildCliMultiMethodTable(routes: InternalRoute[], separator: string) {
  const output: { [key: string]: string[] } = {}
  const table = new Table({
    head: ['Path', 'Method(s)'],
    colAligns: ['left', 'middle'],
    style: {
      head: ['cyan'],
    },
  })

  for (const { path, method } of routes) {
    const storedPath = output[path]

    if (storedPath) output[path] = storedPath.concat(colorMethod(method))
    else output[path] = [colorMethod(method)]
  }

  for (const [key, value] of Object.entries(output)) {
    table.push([key, value.join(pc.gray(separator))])
  }

  return table
}

/**
 * Builds a {@link Table} object from the given {@link InternalRoute | InternalRoutes} where
 * each method of a route is on **different** rows.
 *
 * @param routes The {@link InternalRoute | InternalRoutes} to print.
 *
 * @returns A {@link Table} object that can be printed to the console.
 */
function buildCliTable(routes: InternalRoute[]) {
  const table = new Table({
    head: ['Path', 'Method'],
    colAligns: ['left', 'middle'],
    style: {
      head: ['cyan'],
    },
  })

  for (const { path, method } of routes) table.push([path, colorMethod(method)])

  return table
}

/**
 * Prints the given {@link InternalRoute | InternalRoutes} to the console in a nice table.
 *
 * @param routes The {@link InternalRoute | InternalRoutes} to print.
 * @param opts An optional {@link PrintRoutesOptions | PrintRoutesOptions} object to use for additional options.
 */
export function printRoutes(
  routes: InternalRoute[],
  { multiMethodRows = false, multiMethodSeparator = ' — ' }: PrintRoutesOptions = {}
): void {
  const table = multiMethodRows
    ? buildCliMultiMethodTable(routes, multiMethodSeparator)
    : buildCliTable(routes)

  console.log(`\n${table.toString()}\n`)
}

/**
 * An Elysia Plugin that adds a `/health` and `/readiness` route to the application that return
 * `OK` as a string.
 */
export const HealthCheckRoutes = new Elysia()
  .get('/health', () => 'OK')
  .get('/readiness', () => 'OK')

/**
 * Creates an Elysia Plugin that adds a `/health` and `/readiness` route to the application that
 * return `OK` as a string. Both routes will be prefixed with the given `prefix` value.
 * @param prefix The prefix to use for the health check routes.
 *
 * @returns An Elysia Plugin that adds a `/health` and `/readiness` route.
 */
export function prefixedHealthCheckRoutes(prefix: string) {
  return new Elysia({ prefix }).get('/health', () => 'OK').get('/readiness', () => 'OK')
}
