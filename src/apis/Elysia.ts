import Table from 'cli-table'
import { InternalRoute, Elysia as PrimeElysia } from 'elysia'

/**
 * A class containing various utility functions for use in APIs developed with [Elysia][0].
 *
 * [0]: https://elysiajs.com
 */
export class Elysia {
  public static printElysiaRoutes<T extends PrimeElysia>(app: T): void {
    const table = new Table({
      head: ['Path', 'Method'],
      colAligns: ['left', 'middle'],
      style: {
        head: ['cyan'],
      },
    })

    for (const route of app.routes) {
      table.push([route.path, route.method.toUpperCase()])
    }

    console.log(`\n${table.toString()}\n`)
  }

  /**
   * Prints the given array of Elysia routes to the console as a table.
   *
   * @param routes An array of routes from an Elysia instance to print to console.
   *
   * @example
   * ```ts
   * import { ElysAid } from '@4lch4/backpack'
   * import { Elysia } from 'elysia'
   *
   * const api = new Elysia().get('/test', ctx => 'OK').post('/test', ctx => 'OK')
   *
   * ElysAid.printRoutes(api.routes)
   *
   * api.listen(4242)
   *
   * Output:
   *
   * ┌──────────────────────┬────────┐
   * │ Path                 │ Method │
   * ├──────────────────────┼────────┤
   * │ /test                │  GET   │
   * ├──────────────────────┼────────┤
   * │ /test                │  POST  │
   * └──────────────────────┴────────┘
   *
   * ```
   */
  public static printRoutes(routes: InternalRoute[]) {
    const table = new Table({
      head: ['Path', 'Method'],
      colAligns: ['left', 'middle'],
      style: {
        head: ['cyan'],
      },
    })

    for (const route of routes) {
      table.push([route.path, route.method.toUpperCase()])
    }

    console.log(`\n${table.toString()}\n`)
  }

  public static healthCheckRoutes(prefix?: string) {
    return new PrimeElysia({ prefix }).get('/health', () => 'OK').get('/readiness', () => 'OK')
  }
}
