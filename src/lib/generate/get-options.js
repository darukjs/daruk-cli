const exit = require('fs').existsSync
const path = require('path')

module.exports = function (src) {
  const metaJs = path.join(src, 'meta.js')
  if (!exit(metaJs)) {
    return {}
  }
  const meta = require(path.resolve(metaJs))
  if (meta !== Object(meta)) {
    throw new Error('meta.js needs to expose an object')
  }
  return meta
}
