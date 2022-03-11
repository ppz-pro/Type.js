exports.string = value => typeof value == 'string'
exports.number = value => typeof value == 'number'
exports.boolean = value => typeof value == 'boolean'
exports.symbol = value => typeof value == 'symbol'
exports.bigint = value => typeof value == 'bigint'

exports.int = value => exports.number(value) && value % 1 == 0
exports.nil = value => value == undefined || value == null || false
exports.function = value => value instanceof Function