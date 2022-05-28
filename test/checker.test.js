const checker = require('../index').checker

// string
test('"string" is a string', () => {
  expect(
    checker.string('string')
  ).toBe(true)
})
test('String is not a string', () => {
  expect(
    checker.string(new String('string'))
  ).toBe(false)
})
test('1 is not a string', () => {
  expect(
    checker.string(1)
  ).toBe(false)
})
// number
test('1 is a number', () => {
  expect(
    checker.number(1)
  ).toBe(true)
})
test('"1" isnt a number', () => {
  expect(
    checker.number('1')
  ).toBe(false)
})
test('new Number(1) isnt a number', () => {
  expect(
    checker.number(new Number(1))
  ).toBe(false)
})
test('NaN isnt a number', () => {
  expect(
    checker.number(NaN)
  ).toBe(false)
})
// boolean
test('true is a boolean', () => {
  expect(
    checker.boolean(true)
  ).toBe(true)
})
test('false is a boolean', () => {
  expect(
    checker.boolean(false)
  ).toBe(true)
})
test('"false" is not a boolean', () => {
  expect(
    checker.boolean("false")
  ).toBe(false)
})
test('new Boolean(true) is not a boolean', () => {
  expect(
    checker.boolean(new Boolean(true))
  ).toBe(false)
})
test('null is not a boolean', () => {
  expect(
    checker.boolean(null)
  ).toBe(false)
})
test('undefined is not a boolean', () => {
  expect(
    checker.boolean(undefined)
  ).toBe(false)
})
test(' is not a boolean', () => {
  expect(
    checker.boolean()
  ).toBe(false)
})
test('0 is not a boolean', () => {
  expect(
    checker.boolean(0)
  ).toBe(false)
})
// symbol
test('Symbol("Symbol") is a symbol', () => {
  expect(
    checker.symbol(Symbol("Symbol"))
  ).toBe(true)
})
test('"Symbol" is not a symbol', () => {
  expect(
    checker.symbol("Symbol")
  ).toBe(false)
})
// bigint
test('1n is a bigint', () => {
  expect(
    checker.bigint(1n)
  ).toBe(true)
})
test('BigInt(1) is a bigint', () => {
  expect(
    checker.bigint(BigInt(1))
  ).toBe(true)
})
test('BigInt("1") is a bigint', () => {
  expect(
    checker.bigint(BigInt(1))
  ).toBe(true)
})
test('1 is not a bigint', () => {
  expect(
    checker.bigint(1)
  ).toBe(false)
})
// int
test('1 is a int', () => {
  expect(
    checker.int(1)
  ).toBe(true)
})
test('0 is a int', () => {
  expect(
    checker.int(0)
  ).toBe(true)
})
test('"0" is not a int', () => {
  expect(
    checker.int("0")
  ).toBe(false)
})
test('1.1 is not a int', () => {
  expect(
    checker.int(1.1)
  ).toBe(false)
})
test('true is not a int', () => {
  expect(
    checker.int(true)
  ).toBe(false)
})
// nil
test(' is not a nil', () => {
  expect(
    checker.nil()
  ).toBe(true)
})
test('undefined is a nil', () => {
  expect(
    checker.nil(undefined)
  ).toBe(true)
})
test('null is a nil', () => {
  expect(
    checker.nil(null)
  ).toBe(true)
})
test('0 is not a nil', () => {
  expect(
    checker.nil(0)
  ).toBe(false)
})
test('false is not a nil', () => {
  expect(
    checker.nil(false)
  ).toBe(false)
})
// function
test('function() {} is a function', () => {
  expect(
    checker.function(function() {})
  ).toBe(true)
})
test('async function() {} is a function', () => {
  expect(
    checker.function(async function() {})
  ).toBe(true)
})
test('() => {} is a function', () => {
  expect(
    checker.function(() => {})
  ).toBe(true)
})
test('async () => {} is a function', () => {
  expect(
    checker.function(async () => {})
  ).toBe(true)
})
test('0 is not a function', () => {
  expect(
    checker.function(0)
  ).toBe(false)
})
test('"0" is not a function', () => {
  expect(
    checker.function("0")
  ).toBe(false)
})