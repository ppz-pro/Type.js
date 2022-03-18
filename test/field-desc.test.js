const { FieldDesc, NilField, UnvalidatedField } = require('../index')

// constructor.string
test('contructor error: no options', () => {
  expect(() =>
    new FieldDesc()
  ).toThrow('error on constructing FieldDesc: options cant be undefined')
})
test('contructor error: FieldDesc in, error out', () => {
  expect(() =>
    new FieldDesc(
      new FieldDesc({
        name: 'tel',
        validate: 'string'
      })
    )
  ).toThrow('cant constructing a FieldDesc from a FieldDesc')
})
test('contructor error: no new', () => {
  expect(() =>
    FieldDesc()
  ).toThrow('Class constructor FieldDesc cannot be invoked without \'new\'')
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

// checking

const desc1 = new FieldDesc({
  name: 'tel',
  validate: 'string'
})

test('constructing with string validate 1', () => {
  expect(
    desc1.validate({
      tel: '1234'
    })
  ).toBe()
})

test('constructing with string validate 2', () => {
  expect(
    desc1.validate({})
  ).toBe()
})

test('constructing with string validate 3', () => {
  expect(
    desc1.validate({
      tel: 1234
    })
  ).toBe(UnvalidatedField)
})

const desc2 = new FieldDesc({
  name: 'tel',
  validate: 'string',
  notNull: true
})

test('constructing with string validate 4', () => {
  expect(
    desc2.validate({})
  ).toBe(NilField)
})

test('constructing with string validate 5', () => {
  expect(
    desc2.validate({
      tel: '1234'
    })
  ).toBe()
})

const desc3 = new FieldDesc({
  name: 'year',
  notNull: true,
  validate(value) {
    return value > 0 && value < 150
  }
})

test('constructing with string validate 6', () => {
  expect(
    desc3.validate({})
  ).toBe(NilField)
})

test('constructing with string validate 7', () => {
  expect(
    desc3.validate({
      year: 1
    })
  ).toBe()
})

test('constructing with string validate 8', () => {
  expect(
    desc3.validate({
      year: 0
    })
  ).toBe(UnvalidatedField)
})