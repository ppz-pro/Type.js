const simple = require('./checker')

module.exports = function buildArrayChecker(checkEl) {
  if(simple.string(checkEl) && simple[checkEl])
    checkEl = simple[checkEl]
  else if(!simple.function(checkEl))
    throw Error('checkEl is a string or function but it\'s setting to ' + checkEl)
  
  return function(arr) {
    return arr instanceof Array && arr.every(checkEl)
  }
}