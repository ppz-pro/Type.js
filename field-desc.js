const checker = require('./checker')

module.exports = class FieldDesc {
  constructor(options) {
    if(checker.nil(options))
      throw Error('error on constructing FieldDesc: options cant be undefined')
    if(options instanceof FieldDesc) // 导致不能使用 class 关键字
      throw Error('cant constructing a FieldDesc from a FieldDesc')
  
    if(!checker.string(options.name))
      throw Error('name is a string but it\'s setting to ' + options.name)
    this.name = options.name

    if(checker.nil(options.notNull))
      this.notNull = false
    else if(checker.boolean(options.notNull))
      this.notNull = options.notNull
    else
      throw Error('notNull is a boolean but it\'s setting to ' + options.notNull)
    
    if(checker.string(options.validate) && checker[options.validate])
      this.__validate = checker[options.validate]
    else if(typeof validate == 'function') // 普通函数、箭头函数，不包括 async 函数
      this.__validate = options.validate
    else
      throw Error('validate is a string or function but it\'s setting to ' + options.validate)
  }
  validate(value) {
    if(!this.notNull && checker.nil(value))
      return true
    else
      return this.__validate(target)
  }
}