const NilField = Symbol('nil field')
const UnvalidatedField = Symbol('unvalidated field')

class WrongDetail {}
class FieldWrongDetail extends WrongDetail {
  constructor(name, type) {
    this.name = name
    this.type = type
  }
}

module.exports = {
  NilField,
  UnvalidatedField,
  WrongDetail,
  FieldWrongDetail
}