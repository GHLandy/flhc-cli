/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const chalk = require('chalk')
const shell = require('shelljs')
const { join } = require('path')

const Command = require('../command')

const { CONF_DIST, ATOM_PACKAGES } = require('../conf')

class AtomCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    this.usage = 'Usage: flhc atom [options]'
  }

  get description() {
    return 'Install atom plugins and its dependencies'
  }

  run() {
    this.syncConf()

    /* eslint-disable-next-line */
    const { plugins } = require(join(CONF_DIST, 'atom.js'))

    /* eslint-disable-next-line */
    for (let i = 0; i < plugins.length; i++) {
      const { repo, name } = plugins[i]
      this.syncRepo(repo, join(ATOM_PACKAGES, name))

      if (shell.exec('npm i', { cwd: join(ATOM_PACKAGES, name) }).code !== 0) {
        console.log(chalk.red('npm i failed:'), name)
        shell.exit(1)
      }
    }
  }
}

module.exports = AtomCommand
