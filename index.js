const CommonBin = require('common-bin')

const { join } = require('path')

class FlhcCli extends CommonBin {
  constructor(rawArgv) {
    super(rawArgv)

    this.usage = 'Usage: flhc <command> [options]'

    this.load(join(__dirname, 'lib/cmd'))
  }
}

module.exports = FlhcCli
