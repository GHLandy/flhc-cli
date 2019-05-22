/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const chalk = require('chalk')
const shell = require('shelljs')

const { join } = require('path')
const { existsSync } = require('fs')

const Command = require('../command')

const {
  CONF_DIST,
  CONF_VIMRC,
  DOT_VIMRC,
  VIM_AUTOLOAD,
  VIM_BUNDLE,
} = require('../conf')

class VimCommand extends Command {
  get description() {
    return 'Sync personal vim configuration'
  }

  run() {
    this.syncConf()

    shell.cp(CONF_VIMRC, DOT_VIMRC)
    console.log('Copied', chalk.cyan(CONF_VIMRC), 'to', chalk.green(DOT_VIMRC))

    /* eslint-disable-next-line */
    const { manager, plugins } = require(join(CONF_DIST, 'vimrc.js'))

    if (!existsSync(join(VIM_AUTOLOAD, 'pathogen.vim'))) {
      this.syncRepo(manager.repo, join(VIM_AUTOLOAD, manager.name))

      shell.cp(
        join(join(VIM_AUTOLOAD, manager.name, 'autoload/pathogen.vim')),
        VIM_AUTOLOAD
      )
      shell.rm('-rf', join(VIM_AUTOLOAD, manager.name))
    }

    /* eslint-disable-next-line */
    for (let i = 0; i < plugins.length; i++) {
      const { repo, name } = plugins[i]
      this.syncRepo(repo, join(VIM_BUNDLE, name))
    }
  }
}

module.exports = VimCommand
