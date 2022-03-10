const Checker = require('./checker').Checker

module.exports = class ArrayChecker extends Checker {
  constructor(valicateEl) {
    super()

    if(this.isNil(valicateEl))
      this.#check = this.#isArray
    else {
      if(typeof valicateEl == 'string') {
        const typeName = valicateEl
        valicateEl = el => typeof el == typeName
      } else if(typeof valicateEl != 'function')
        throw Error('type of validateEl can only be string or function')
      this.#check = target => {
        if(this.#isArray(target))
          return target.every(valicateEl)
        else
          return false
      }
    }
  }

  #isArray(target) {
    return target instanceof Array
  }
  check(target) {
    if(this.#check(target))
      return target
    this.typeError('array', target)
  }
}