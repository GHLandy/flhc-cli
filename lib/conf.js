const os = require('os')
const { join } = require('path')

const HOME = os.homedir()

const CONF_REPO = 'https://github.com/GHLandy/personal-misc.git'
const CONF_DIST = join(HOME, 'personal-misc')

const CONF_VIMRC = join(CONF_DIST, 'vimrc')
const DOT_VIMRC = join(HOME, '.vimrc')
const VIM_AUTOLOAD = join(HOME, '.vim/autoload')
const VIM_BUNDLE = join(HOME, '.vim/bundle')

module.exports = {
  HOME,
  CONF_REPO,
  CONF_DIST,

  CONF_VIMRC,
  DOT_VIMRC,
  VIM_AUTOLOAD,
  VIM_BUNDLE,
}
