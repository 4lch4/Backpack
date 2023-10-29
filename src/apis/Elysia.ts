import Table from 'cli-table'
import { Elysia, InternalRoute } from 'elysia'

export function printRoutes(routes: InternalRoute[]) {
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

export const HealthCheckRoutes = new Elysia()
  .get('/health', () => 'OK')
  .get('/readiness', () => 'OK')

export function prefixedHealthCheckRoutes(prefix?: string) {
  return new Elysia({ prefix }).get('/health', () => 'OK').get('/readiness', () => 'OK')
}
