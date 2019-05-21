const fs = require('fs')

exports.isDirEmpty = function (path) {
  if (!fs.existsSync(path)) {
    return true
  }
  return fs.readdirSync(path).length === 0
}
