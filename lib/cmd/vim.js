/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const CommonBin = require('common-bin')

const fs = require('fs')
const os = require('os')
const chalk = require('chalk')

const { existsSync } = require('fs')
const { join } = require('path')

const HOME = os.homedir()
const REPO = 'https://github.com/GHLandy/personal-misc.git'
const DEST = join(HOME, 'personal-misc')

const VIMRC = join(DEST, 'vimrc')
const DOT_VIMRC = join(HOME, '.vimrc')

class Command extends CommonBin {
  get description() {
    return 'Sync personal vim configuration'
  }

  *run() {
    if (existsSync(join(DEST, '.git'))) {
      yield this.helper.spawn('git', ['pull'], { cwd: DEST })
    } else {
      yield this.helper.spawn('git', ['clone', REPO, DEST])
    }

    // TODO: Sync vim plugin to ~/vim/bundle

    const rs = fs.createReadStream(VIMRC)
    const ws = fs.createWriteStream(DOT_VIMRC)

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

module.exports = Command
