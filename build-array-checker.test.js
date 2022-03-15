const build = require('./build-array-checker')

// arguments
test('build error on no argument', () => {
  expect(() =>
    build()
  ).toThrow('checkEl is a string or function but it\'s setting to undefined')
})
test('build error on wrong type', () => {
  expect(() =>
    build(1)
  ).toThrow('checkEl is a string or function but it\'s setting to 1')
})
test('build error on wrong string type', () => {
  expect(() =>
    build('object')
  ).toThrow('checkEl is a string or function but it\'s setting to object')
})

// function checker
const funChecker1 = build(a => {
  return a > 0 && a < 100
})
test('function checker1', () => {
  expect(
    funChecker1([1,2,3])
  ).toBe(true)
})
test('function checker1', () => {
  expect(
    funChecker1([])
  ).toBe(true)
})
test('wrong function checker1', () => {
  expect(
    funChecker1([0,1,2])
  ).toBe(false)
})
test('wrong function checker1', () => {
  expect(
    funChecker1()
  ).toBe(false)
})
test('wrong function checker1', () => {
  expect(
    funChecker1('123')
  ).toBe(false)
})

// string checker
const numberArrChecker = build('number')
test('number[]', () => {
  expect(
    numberArrChecker([1,2,3])
  ).toBe(true)
})
test('wrong number[]', () => {
  expect(
    numberArrChecker([1,2,'3'])
  ).toBe(false)
})
test('wrong number[]', () => {
  expect(
    numberArrChecker([1,2,new Number(3)])
  ).toBe(false)
})
