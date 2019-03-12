#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const initRepo = require('../src')

program.version(require('../package').version, '-v, --version')
// .usage('<command> [options]')

program
  .command('init <project> [template]')
  .option('-i, --ignore', 'use remote template but local cache')
  .description('init repository with template')
  .action((project, template, option) => {
    template = template || 'git@github.com:daruk-framework/daruk-template.git#master'
    initRepo(template, project, option)
  })

program.on('command:*', function () {
  console.error(
    chalk.red(
      'Invalid command: %s\nSee --help for a list of available commands.',
      program.args.join(' ')
    )
  )
  process.exit(1)
})

program.parse(process.argv)
