/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const chalk = require('chalk')
const shell = require('shelljs')

const Command = require('../command')

const { CONF_VIMRC, DOT_VIMRC } = require('../conf')

class VimCommand extends Command {
  get description() {
    return 'Sync personal vim configuration'
  }

  *run() {
    yield this.syncConf()

    shell.cp(CONF_VIMRC, DOT_VIMRC)
    console.log('Copied', chalk.cyan(CONF_VIMRC), 'to', chalk.green(DOT_VIMRC))
  }
}

module.exports = VimCommand
