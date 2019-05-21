const download = require('download-git-repo')
const exists = require('fs').existsSync
const ora = require('ora')
const rm = require('rimraf').sync

module.exports = function (url, outputDir, options, cb) {
  if (exists(outputDir)) {
    if (options.ignore) {
      rm(outputDir)
    } else {
      return cb(null)
    }
  }
  const spinner = ora('downloading template')
  spinner.start()
  download(url, outputDir, { clone: options.clone }, (err) => {
    spinner.stop()
    cb && cb(err)
  })
}
