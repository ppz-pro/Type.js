const FieldDesc = require('./field-desc')
const {
  NilField,
  UnvalidatedField,
  WrongDetail,
  NilWrongDetail,
  FieldWrongDetail
} = require('./wrong')

class Type {
  constructor(fields) {
    if(!(fields instanceof Array))
      throw Error('fields should be an Array')
    this.fields = fields.map(field => new FieldDesc(field))
  }
  validate(object) {
    if(!object)
      return new NilWrongDetail()
    for(let desc of this.fields) {
      const wrongField = desc.validate(object)
      if(wrongField)
        return new FieldWrongDetail(desc.name, wrongField)
    }
  }
}

module.exports = {
  Type,
  
  NilField,
  UnvalidatedField,
  WrongDetail,
  NilWrongDetail,
  FieldWrongDetail
}