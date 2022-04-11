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
  ).toThrow('validate is a string(one of [string, truestring, number, boolean, symbol, bigint, '
    + 'int, nil, function]) or function but it\'s setting to undefined')
})
test('contructor error: validate wrong type', () => {
  expect(() =>
    new FieldDesc({
      name: 'tel',
      validate: 1
    })
  ).toThrow('validate is a string(one of [string, truestring, number, boolean, symbol, bigint, '
    + 'int, nil, function]) or function but it\'s setting to 1')
})

// checking

test('string validate', () => {
  const desc1 = new FieldDesc({
    name: 'tel',
    validate: 'string'
  })
  expect(
    desc1.validate({
      tel: '1234'
    })
  ).toBe()
  expect(
    desc1.validate({})
  ).toBe()
  expect(
    desc1.validate({
      tel: 1234
    })
  ).toBe(UnvalidatedField)
  
  const desc2 = new FieldDesc({
    name: 'tel',
    validate: 'string',
    notNull: true
  })
  expect(
    desc2.validate({})
  ).toBe(NilField)
  expect(
    desc2.validate({
      tel: ''
    })
  ).toBe()
  expect(
    desc2.validate({
      tel: '1234'
    })
  ).toBe()

  
  const desc3 = new FieldDesc({
    name: 'tel',
    validate: 'truestring',
    notNull: true
  })
  expect(
    desc3.validate({})
  ).toBe(NilField)
  expect(
    desc3.validate({
      tel: ''
    })
  ).toBe(NilField)
  expect(
    desc3.validate({
      tel: '1234'
    })
  ).toBe()

  const desc4 = new FieldDesc({
    name: 'tel',
    validate: 'truestring'
  })
  expect(
    desc4.validate({})
  ).toBe()
  expect(
    desc4.validate({
      tel: ''
    })
  ).toBe()
  expect(
    desc4.validate({
      tel: '1234'
    })
  ).toBe()
  expect(
    desc4.validate({
      tel: 1234
    })
  ).toBe(UnvalidatedField)
})

test('function validate', () => {
  const desc = new FieldDesc({
    name: 'year',
    notNull: true,
    validate(value) {
      return value > 0 && value < 150
    }
  })
  expect(
    desc.validate({})
  ).toBe(NilField)
  expect(
    desc.validate({
      year: 1
    })
  ).toBe()
  expect(
    desc.validate({
      year: 0
    })
  ).toBe(UnvalidatedField)
})