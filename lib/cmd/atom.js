/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

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

  *run() {
    yield this.syncConf()

    /* eslint-disable-next-line */
    const { plugins } = require(join(CONF_DIST, 'atom.js'))

    /* eslint-disable-next-line */
    for (let i = 0; i < plugins.length; i++) {
      const { repo, name } = plugins[i]
      yield this.syncRepo(repo, join(ATOM_PACKAGES, name))
    }
  }
}

module.exports = AtomCommand
