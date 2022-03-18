const NilField = Symbol('nil field')
const UnvalidatedField = Symbol('unvalidated field')

class WrongDetail {
  is(Class) {
    return this instanceof Class
  }
}

class NilWrongDetail extends WrongDetail {
  toString() {
    return 'target is nil'
  }
}
class FieldWrongDetail extends WrongDetail {
  constructor(name, type) {
    super()
    this.name = name
    this.type = type
  }
  toString() {
    return `error on field ${this.name}, type: ${this.type.toString()}`
  }
}

module.exports = {
  NilField,
  UnvalidatedField,
  WrongDetail,
  NilWrongDetail,
  FieldWrongDetail
}