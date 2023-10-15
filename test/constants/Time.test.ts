import { DAY, HOUR, MINUTE, MONTH, SECOND, WEEK, YEAR } from '@constants/time'
import { expect, test } from 'bun:test'

const OneSecond = 1000
const OneMinute = OneSecond * 60
const OneHour = OneMinute * 60
const OneDay = OneHour * 24
const OneWeek = OneDay * 7
const OneMonth = OneDay * 30
const OneYear = OneDay * 365

test('SECOND should equal one thousand milliseconds', () => {
  expect(SECOND).toEqual(OneSecond)
})

test('MINUTE should equal one minute worth of milliseconds', () => {
  expect(MINUTE).toEqual(OneMinute)
})

test('HOUR should equal one hour worth of milliseconds', () => {
  expect(HOUR).toEqual(OneHour)
})

test('DAY should equal one day worth of milliseconds', () => {
  expect(DAY).toEqual(OneDay)
})

test('WEEK should equal one week worth of milliseconds', () => {
  expect(WEEK).toEqual(OneWeek)
})

test('MONTH should equal one month worth of milliseconds', () => {
  expect(MONTH).toEqual(OneMonth)
})

test('YEAR should equal one year worth of milliseconds', () => {
  expect(YEAR).toEqual(OneYear)
})
