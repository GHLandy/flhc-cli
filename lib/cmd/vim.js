/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const chalk = require('chalk')
const { createReadStream, createWriteStream } = require('fs')

const Command = require('../command')

const { CONF_VIMRC, DOT_VIMRC } = require('../conf')

class VimCommand extends Command {
  get description() {
    return 'Sync personal vim configuration'
  }

  *run() {
    yield this.syncConf()

    // TODO: Sync vim plugin to ~/vim/bundle

    const rs = createReadStream(CONF_VIMRC)
    const ws = createWriteStream(DOT_VIMRC)

    rs.on('data', fd => {
      ws.write(fd)
    })

    rs.on('end', () => {
      console.log(chalk.green('Syncd'))
      console.log(
        chalk.cyan(
          'You now need to clone the plugins to ~/.vim/bundle, as vimrc mentioned'
        )
      )
    })

    ws.on('open', () => {
      console.log(`Syncing ${chalk.cyan('vimrc')} to ${chalk.cyan('~/.vimrc')}`)
    })
  }
}

module.exports = VimCommand
