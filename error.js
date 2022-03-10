class TypeJSError extends Error {}

class UnwritableError extends TypeJSError {
  constructor() {
    super('writing unwritable field')
  }
}

module.exports = {
  TypeJSError, UnwritableError
}