const FieldDesc = require('./field-desc')
const checker = require('./checker')
const buildArrayChecker = require('./build-array-checker')

class TypeJS {
  /**
   * 给 js 对象添加类型
   * @param {FieldDesc[]} optionsList
   */
  constructor(optionsList) {
    if(!(optionsList instanceof Array))
      throw Error('error on constructing TypeJS')
    
    this.list = optionsList.map(FieldDesc)
  }
  check(object) {
    if(!object)
      return false
    for(let desc of this.#list)
      if(!desc.validate(object[desc.name]))
        return desc
    return false
  }
}

module.exports = {
  TypeJS,
  FieldDesc,
  checker,
  buildArrayChecker
}