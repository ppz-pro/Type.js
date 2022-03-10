const TypeJSError = require('./error').TypeJSError

class CheckerError extends TypeJSError {
  constructor(name, value) {
    super(`error on type checking, typeName: ${name}, value: ${value}`)
  }
}

class Checker {
  checkString(value) {
    if(typeof value == 'string')
      return value
    this.typeError('string', value)
  }
  checkBoolean(value) {
    if(typeof value == 'boolean')
      return value
    this.typeError('boolean', value)
  }
  checkNumber(value) {
    if(typeof value == 'number')
      return value
    this.typeError('number', value)
  }
  checkInt(value) {
    value = this.checkNumber(value)
    if(value % 1 == 0)
      return value
    this.typeError('int', value)
  }
  
  isNil(value) {
    return value == undefined || value == null || false
  }
  typeError(typename, value) {
    throw new CheckerError(typename, value)
  }
}

module.exports = {
  Checker, CheckerError
}