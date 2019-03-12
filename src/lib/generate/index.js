const Handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const path = require('path')
const chalk = require('chalk')
const logger = require('../logger')
const getOptions = require('./get-options')
const ask = require('./ask')
const filter = require('./filter')
const render = require('./render')

Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b
    ? opts.fn(this)
    : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b
    ? opts.inverse(this)
    : opts.fn(this)
})

Handlebars.registerHelper('if_in', function (object, key, opts) {
  return object[key] === true
    ? opts.fn(this)
    : opts.inverse(this)
})

module.exports = function (templateDir, project, cb) {
  const dest = path.resolve(project)

  const metalsmith = Metalsmith(path.join(templateDir, 'template'))
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: project,
    inPlace: dest === process.cwd(),
    noEscape: true
  })

  let opts = getOptions(templateDir)
  opts = typeof opts === 'function' ? opts(data) : opts

  opts.helpers && Object.keys(opts.helpers).map(key => {
    Handlebars.registerHelper(key, opts.helpers[key])
  })

  const helpers = { chalk, logger }
  if (opts.metalsmith && typeof opts.metalsmith.before === 'function') {
    opts.metalsmith.before(metalsmith, opts, helpers)
  }

  metalsmith.use(ask(opts.prompts))
    .use(filter(opts.filters))
    .use(render(opts.skipInterpolation))

  if (typeof opts.metalsmith === 'function') {
    opts.metalsmith(metalsmith, opts, helpers)
  } else if (opts.metalsmith && typeof opts.metalsmith.after === 'function') {
    opts.metalsmith.after(metalsmith, opts, helpers)
  }

  metalsmith.clean(false)
    .source('.')
    .destination(dest)
    .build((err, files) => {
      cb && cb(err)
      if (typeof opts.complete === 'function') {
        const helpers = { chalk, logger, files }
        opts.complete(data, helpers)
      } else {
        logMessage(opts.completeMessage, data)
      }
    })
}

/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */

function logMessage (message, data) {
  if (!message) return
  render(message, data, (err, res) => {
    if (err) {
      console.error('\n   Error when rendering template complete message: ' + err.message.trim())
    } else {
      console.log('\n' + res.split(/\r?\n/g).map(line => '   ' + line).join('\n'))
    }
  })
}
