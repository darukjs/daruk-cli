// reference: https://github.com/vuejs/vue-cli

const home = require('user-home')
const path = require('path')
const downloadRepo = require('./lib/download-repo')
const logger = require('./lib/logger')
const generate = require('./lib/generate')

module.exports = function (template, project, option) {
  const templateOutputDir = path.join(home, '.daruk-template', template)
  downloadRepo(template, templateOutputDir, option.ignore, (err) => {
    if (err) {
      logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
      return
    }
    generate(templateOutputDir, project, err => {
      if (err) logger.fatal(err)
      logger.success('Generated "%s".', project)
    })
  })
}
