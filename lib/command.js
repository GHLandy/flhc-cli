/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

const CommonBin = require('common-bin')
const chalk = require('chalk')
const shell = require('shelljs')

const { join } = require('path')
const { existsSync } = require('fs')

const { CONF_REPO, CONF_DIST } = require('./conf')

class Command extends CommonBin {
  // Sync configuration from repo.
  syncConf() {
    this.syncRepo(CONF_REPO, CONF_DIST)
  }

  // Sync specify repo to specify dist
  syncRepo(repo, dist) {
    if (existsSync(join(dist, '.git'))) {
      shell.exec('git reset --hard master', { cwd: dist })

      if (shell.exec('git pull', { cwd: dist }).code !== 0) {
        console.log(chalk.red('Pull failed:'), chalk.cyan(repo))
        return shell.exit(1)
      }

      return console.log(chalk.white('Pull success'), chalk.cyan(repo))
    }

    if (shell.exec(`git clone ${repo} ${dist}`).code !== 0) {
      console.log(chalk.red('Clone failed:'), chalk.cyan(repo))
      return shell.exit(1)
    }

    return console.log(chalk.white('Clone success:'), chalk.cyan(repo))
  }
}

module.exports = Command
