const FieldDesc = require('./field-desc')

// constructor.string
test('contructor error: no options', () => {
  expect(() =>
    new FieldDesc()
  ).toThrow('error on constructing FieldDesc')
})
test('contructor error: no name', () => {
  expect(() =>
    new FieldDesc({})
  ).toThrow('name is a string but it\'s setting to undefined')
})
test('contructor error: name wrong type', () => {
  expect(() =>
    new FieldDesc({
      name: 1
    })
  ).toThrow('name is a string but it\'s setting to 1')
})
// constructor.notNull
test('contructor error: notNull wrong type', () => {
  expect(() =>
    new FieldDesc({
      name: 'tel',
      notNull: 1
    })
  ).toThrow('notNull is a boolean but it\'s setting to 1')
})
test('contructor: notNull default to false', () => {
  expect(
    new FieldDesc({
      name: 'tel',
      validate: 'string'
    }).notNull
  ).toBe(false)
})
// constructor.validate
test('contructor error: no validate', () => {
  expect(() =>
    new FieldDesc({
      name: 'tel'
    })
  ).toThrow('validate is a string or function but it\'s setting to undefined')
})
test('contructor error: validate wrong type', () => {
  expect(() =>
    new FieldDesc({
      name: 'tel',
      validate: 1
    })
  ).toThrow('validate is a string or function but it\'s setting to 1')
})

// FieldDesc in, FieldDesc out
// test('FieldDesc in, FieldDesc out')