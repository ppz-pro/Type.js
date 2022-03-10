const { Checker, CheckerError } = require('./checker')
const ArrayChecker = require('./array-checker')
const FieldDesc = require('./field-desc')
const { TypeJSError, UnwritableError } = require('./error')


const fieldDescListChecker = new ArrayChecker(function(target) {
  return target instanceof FieldDesc
})

class TypeJS {
  /**
   * 给 js 对象添加类型
   * @param {FieldDesc[]} fieldDescList
   */
  constructor(fieldDescList) {
    this.#list = fieldDescListChecker.check(fieldDescList)
  }
  check(object) {
    if(!object)
      return false
    for(let desc of this.#list)
      if(!desc.validate(object))
        return desc
    return false
  }
}

module.exports = {
  TypeJS,
  Checker,
  ArrayChecker,
  FieldDesc,
  TypeJSError,
  UnwritableError,
  CheckerError
}