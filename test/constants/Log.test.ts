import { DEFAULT_LOG_SERVICE } from '@constants/log'
import { expect, test } from 'bun:test'

test('DEFAULT_LOG_SERVICE should equal "@4lch4/backpack"', () => {
  expect(DEFAULT_LOG_SERVICE).toEqual('@4lch4/backpack')
})

test('DEFAULT_LOG_SERVICE should be a string', () => {
  expect(typeof DEFAULT_LOG_SERVICE).toEqual('string')
})
