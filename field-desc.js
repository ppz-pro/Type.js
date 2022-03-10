const Error = require('./error')
const UnwritableError = Error.UnwritableError
const Checker = require('./checker')

module.exports =
class FieldDesc extends Checker {
  constructor({ name, validate, notNull }) {
    super()
    this.#setName(name)
    this.#setValidate(validate)
    this.#setNotNull(notNull)
  }

  get name() {
    return this.#name
  }
  set name(value) {
    throw UnwritableError()
  }
  #setName(value) {
    this.#name = this.checkString(value)
  }

  get validate() {
    return this.#validate
  }
  set validate(value) {
    throw UnwritableError()
  }
  #setValidate(value) {
    let validate
    if(typeof value == 'string')
      validate = target => typeof target == value
    else if(typeof value == 'function') // 普通函数、箭头函数，不包括 async 函数
      validate = value
    else
      this.typeError('validate', value)
    
    this.#validate = target => {
      if(this.isNil(target) && this.allowNull)
        return true
      else
        return validate(target)
    }
  }

  get notNull() {
    return this.#notNull
  }
  set notNull(value) {
    throw UnwritableError()
  }
  #setNotNull(value) {
    if(isNil(value))
      this.#notNull = false
    else
      this.#notNull = this.checkBoolean('notNull', value)
  }
}