const config = require('./conf.js').CONFIG_BUILD
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

let getEntry = () => {

    let files = glob.sync(config.src + '/**/*.js')
    let srcLength = config.src.length

    let entrys = {}
    
    files.forEach(function(_file){
        let file = path.parse(_file)
        let htmlFile = path.resolve(file.dir, file.name + '.' + config.ext)

        if (fs.existsSync(htmlFile)) {
            let pathIndex = file.dir.indexOf(config.src)

            if (config.env == 'development') {
                entrys[config.staticRoot + file.dir.slice(srcLength) + '/' + file.name] = [path.resolve(_file), hotMiddlewareScript]
            } else {
                entrys[config.staticRoot + file.dir.slice(srcLength) + '/' + file.name] = path.resolve(_file)
            }
        }
    })
    return entrys
}

module.exports = getEntry