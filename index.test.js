
const { TypeJS, FieldDesc } = require('./index')

const typer = new TypeJS([
  new FieldDesc({
    name: 'tel',
    validate: 'string',
    notNull: true
  }),
  new FieldDesc({
    name: 'address',
    validate: 'string'
  }),
  new FieldDesc({
    name: 'married',
    validate: 'boolean'
  }),
  new FieldDesc({
    name: 'year',
    validate: 'number'
  }),
  new FieldDesc({
    name: 'gender',
    validate(value) {
      return ['male', 'female'].includes(value)
    }
  })
])

test('right1', () => {
  expect(typer.check({
    tel: '8703',
    year: 2
  })).toBe(false)
})

test('right2', () => {
  expect(typer.check({
    tel: ''
  })).toBe(false)
})

test('right3', () => {
  expect(typer.check({
    tel: '',
    married: true,
    gender: 'male'
  })).toBe(false)
})

test('right4', () => {
  expect(typer.check({
    tel: '',
    address: '1234',
    gender: 'male',
    married: false
  })).toBe(false)
})

test('wrong on the type of tel', () => {
  expect(typer.check({
    tel: 1
  }).name).toBe('tel')
})

test('wrong on the type of year', () => {
  expect(typer.check({
    tel: '8703',
    year: '1'
  }).name).toBe('year')
})

test('wrong on the type of gender', () => {
  expect(typer.check({
    tel: '',
    gender: 1
  }).name).toBe('gender')
})

test('wrong on the type of married', () => {
  expect(typer.check({
    tel: '',
    gender: 1,
    married: 0
  }).name).toBe('married')
})