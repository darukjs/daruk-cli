const download = require('download-git-repo')
const exists = require('fs').existsSync
const ora = require('ora')
const rm = require('rimraf').sync

module.exports = function (url, outputDir, ignoreCache, cb) {
  if (exists(outputDir)) {
    if (ignoreCache) {
      rm(outputDir)
    } else {
      return cb(null)
    }
  }
  const spinner = ora('downloading template')
  spinner.start()
  download(url, outputDir, (err) => {
    spinner.stop()
    cb && cb(err)
  })
}
