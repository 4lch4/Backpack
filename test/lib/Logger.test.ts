import { logger } from '@lib/index'
import { describe, expect, test } from 'bun:test'
// import { isAxiomConfigured } from '../Helpers.test'

const isAxiomConfigured = () => {
  if (process.env.AXIOM_DATASET && process.env.AXIOM_ORG_ID && process.env.AXIOM_TOKEN) return true
  else return false
}
const expectedTransports = isAxiomConfigured() ? 2 : 1

describe('@lib/index', () => {
  test('should export logger', () => {
    expect(logger).toBeDefined()
  })

  test('should export logger of type object', () => {
    expect(typeof logger).toEqual('object')
  })
})

describe('logger.defaultMeta', () => {
  test('should exist', () => {
    expect(logger.defaultMeta).toBeDefined()
  })

  test('should have service key', () => {
    expect(logger.defaultMeta.service).toBeDefined()
  })

  test('should have nodeEnv key', () => {
    expect(logger.defaultMeta.nodeEnv).toBeDefined()
  })

  test('should have hostname key', () => {
    expect(logger.defaultMeta.hostname).toBeDefined()
  })

  test('should have arch key', () => {
    expect(logger.defaultMeta.arch).toBeDefined()
  })

  test('should have platform key', () => {
    expect(logger.defaultMeta.platform).toBeDefined()
  })
})

describe('logger.levels', () => {
  test('should have error level', () => {
    expect(logger.levels.error).toBeDefined()
  })

  test('should have warn level', () => {
    expect(logger.levels.warn).toBeDefined()
  })

  test('should have info level', () => {
    expect(logger.levels.info).toBeDefined()
  })

  test('should have http level', () => {
    expect(logger.levels.http).toBeDefined()
  })

  test('should have verbose level', () => {
    expect(logger.levels.verbose).toBeDefined()
  })

  test('should have debug level', () => {
    expect(logger.levels.debug).toBeDefined()
  })

  test('should have silly level', () => {
    expect(logger.levels.silly).toBeDefined()
  })

  test('should have success level', () => {
    expect(logger.levels.success).toBeDefined()
  })
})

describe('values of logger.levels', () => {
  test('error level should be 0', () => {
    expect(logger.levels.error).toEqual(0)
  })

  test('warn level should be 1', () => {
    expect(logger.levels.warn).toEqual(1)
  })

  test('info level should be 2', () => {
    expect(logger.levels.info).toEqual(2)
  })

  test('http level should be 3', () => {
    expect(logger.levels.http).toEqual(3)
  })

  test('verbose level should be 4', () => {
    expect(logger.levels.verbose).toEqual(4)
  })

  test('debug level should be 5', () => {
    expect(logger.levels.debug).toEqual(5)
  })

  test('silly level should be 6', () => {
    expect(logger.levels.silly).toEqual(6)
  })

  test('success level should be -1', () => {
    expect(logger.levels.success).toEqual(-1)
  })
})

test(`logger.transports should have ${expectedTransports} values`, () => {
  expect(logger.transports.length).toEqual(expectedTransports)
})
