const config = require('./conf.js').CONFIG_BUILD
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let createRules = function(extractInstance) {

    let cssLoader

    config.env == 'development' ? cssLoader = [{loader:'style-loader'},{loader:'css-loader'},{loader: 'less-loader'}] : cssLoader = extractInstance.extract(['css-loader', 'less-loader'])

    let rules = [
        {
            test: /\.(css|less)$/,
            exclude: /node_modules/,
            use: cssLoader
        },
        {
            test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf|swf)\??.*$/,
            loader: 'file-loader',
            exclude: /node_modules/,
            options: {
              name: config.staticRoot + '/assets_url/[name].[ext]?[hash:8]'
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.html$/,
            exclude: /node_modules/,
            use: {
              loader: 'html-loader',
              options: {
                minimize: false
              }
            }
        }
    ]

    return rules
}

module.exports = createRules