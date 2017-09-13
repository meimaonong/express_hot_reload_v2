const path = require('path')
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'development'

const CONFIG_BUILD = {
    env: env,
    ext: 'html',
    src: path.resolve(__dirname, '../../tsrc'),
    path: env == 'development' ? '/' : path.resolve(__dirname, '../../dist'),
    templateRoot: 'templates',
    staticRoot: 'static',
    serverLayoutName: 'base',
    publicPath: env == 'development' ? ('http://localhost:' + port + '/') : '/'
}

const setConf = function(option) {
    Object.assign(CONFIG_BUILD, option)
}

module.exports = {
    CONFIG_BUILD,
    setConf
}