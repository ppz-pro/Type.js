const NilField = Symbol('nil field')
const UnvalidatedField = Symbol('unvalidated field')

class WrongDetail {
  is(Class) {
    return this instanceof Class
  }
}

class NilWrongDetail extends WrongDetail {}
class FieldWrongDetail extends WrongDetail {
  constructor(name, type) {
    super()
    this.name = name
    this.type = type
  }
}

module.exports = {
  NilField,
  UnvalidatedField,
  WrongDetail,
  NilWrongDetail,
  FieldWrongDetail
}