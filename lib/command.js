/* eslint-disable no-console */

const CommonBin = require('common-bin')
const chalk = require('chalk')

const { join } = require('path')
const { existsSync } = require('fs')

const { CONF_REPO, CONF_DIST } = require('./conf')

class Command extends CommonBin {
  // Sync configuration from repo.
  *syncConf() {
    return yield this.syncRepo(CONF_REPO, CONF_DIST)
  }

  // Sync specify repo to specify dist
  *syncRepo(repo, dist) {
    if (existsSync(join(dist, '.git'))) {
      yield this.helper.spawn('git', ['pull'], { cwd: dist })
      return console.log('Pull', chalk.cyan(repo), chalk.green('finished.'))
    }

    yield this.helper.spawn('git', ['clone', repo, dist])
    return console.log('Clone', chalk.cyan(repo), chalk.green('finished.'))
  }
}

module.exports = Command
