const CommonBin = require('common-bin')

const { join } = require('path')
const { existsSync } = require('fs')

const { CONF_REPO, CONF_DIST } = require('./conf')

class Command extends CommonBin {
  // Sync configuration from repo.
  *syncConf() {
    if (existsSync(join(CONF_DIST, '.git'))) {
      yield this.helper.spawn('git', ['pull'], { cwd: CONF_DIST })
    } else {
      yield this.helper.spawn('git', ['clone', CONF_REPO, CONF_DIST])
    }
  }
}

module.exports = Command
