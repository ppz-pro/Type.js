const {
  Type,
  
  NilField,
  UnvalidatedField,
  WrongDetail,
  NilWrongDetail,
  FieldWrongDetail
} = require('../index')

test('error when constructing Type', () => {
  expect(() =>
    new Type()
  ).toThrow('fields should be an Array')
  expect(() =>
    new Type(1)
  ).toThrow('fields should be an Array')
  expect(() =>
    new Type('123')
  ).toThrow('fields should be an Array')
  expect(() =>
    new Type([1])
  ).toThrow('name is a string but it\'s setting to undefined')
})

test('validate: one field', () => {
  const type = new Type([
    {
      name: 'tel',
      validate: 'string'
    }
  ])

  expect(
    type.fields.length
  ).toBe(1)
  expect(
    type.fields[0].name
  ).toBe('tel')

  const result1 = type.validate()
  expect(
    result1
  ).toBeInstanceOf(NilWrongDetail)
  expect(
    result1 instanceof NilWrongDetail
  ).toBe(true)
  expect(
    result1.is(NilWrongDetail)
  ).toBe(true)
  expect(
    result1.is(WrongDetail)
  ).toBe(true)

  const result2 = type.validate({})
  expect(
    result2
  ).toBe()

  const result3 = type.validate({
    tel: 123
  })
  expect(
    result3.is(FieldWrongDetail)
  ).toBe(true)
  expect(
    result3.name
  ).toBe('tel')
  expect(
    result3.type
  ).toBe(UnvalidatedField)
})

test('validate: multi-field', () => {
  const type = new Type([
    {
      name: 'tel',
      validate: 'string'
    }, {
      name: 'gender',
      notNull: true,
      validate(value) {
        return ['male', 'female'].indexOf(value) != -1
      }
    }, {
      name: 'year',
      validate(value) {
        return value > 0 && value < 150
      }
    }
  ])

  const result1 = type.validate()
  expect(
    result1.is(NilWrongDetail)
  ).toBe(true)
  
  const result2 = type.validate({})
  expect(
    result2
  ).toBeInstanceOf(FieldWrongDetail)
  expect(
    result2.type
  ).toBe(NilField)
  expect(
    result2.name
  ).toBe('gender')

  const result3 = type.validate({
    tel: '123',
    gender: 1
  })
  expect(
    result3.is(FieldWrongDetail)
  ).toBe(true)
  expect(
    result3.name
  ).toBe('gender')
  expect(
    result3.type
  ).toBe(UnvalidatedField)
})

test('wrong detail to string', () => {
  const type = new Type([{
    name: 'version',
    validate: 'string',
    notNull: true
  }])

  expect(
    type.validate().toString()
  ).toBe('target is nil')

  expect(
    type.validate({}).toString()
  ).toBe(`error on field version, type: Symbol(nil)`)

  expect(
    type.validate({
      version: 123
    }).toString()
  ).toBe(`error on field version, type: Symbol(unvalidated)`)
})