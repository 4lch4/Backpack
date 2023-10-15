import { logger } from '@lib/index'
import { expect, test } from 'bun:test'

test('@lib/index should export logger', () => {
  console.log(`[0]: logger.transports.length = ${logger.transports.length}`)
  expect(logger).toBeDefined()
})

test('logger should be an object', () => {
  expect(typeof logger).toEqual('object')
})
