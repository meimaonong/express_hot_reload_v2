var webpack = require('webpack');
const conf = require('./../build/conf.js');
const entry = require('./../build/entry.js');
const html = require('./../build/html.js');
const rules = require('./../build/rules.js');
const swigPlugin = require('./../build/swig.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let htmlPlugins = html()
let webpackPlugins = []

webpackPlugins = webpackPlugins.concat(
    htmlPlugins,
    [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    [
        new webpack.optimize.CommonsChunkPlugin({
            name: conf.CONFIG_BUILD.staticRoot + '/common',
            filename: conf.CONFIG_BUILD.env == 'development' ? '[name]/build.js?[hash:8]' : '[name]/build.js?[chunkhash:8]',
            minChunks: 2
        }),
        new swigPlugin()
    ]
)

if (conf.CONFIG_BUILD.env == 'production') {
    webpackPlugins = webpackPlugins.concat(
        [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ]
    )
}

if (conf.CONFIG_BUILD.env == 'development') {
    webpackPlugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
}

let cssExtract = new ExtractTextPlugin('[name].css?[chunkhash:8]')
let defaultRules = rules(cssExtract)
webpackPlugins.push(cssExtract)

let webpackRules = []
webpackRules = webpackRules.concat(defaultRules)

let entryObj = entry()

let webpackConfig = {
    entry: entryObj,
  
    resolve: {
        extensions: ['.js', '.vue', '.json', 'jsx']
    },
  
    devtool: conf.CONFIG_BUILD.env == 'development' ? '#eval-source-map' : false,
  
    cache: conf.CONFIG_BUILD.env == 'development' ? true : false,
  
    output: {
      path: conf.CONFIG_BUILD.path,
      publicPath: conf.CONFIG_BUILD.publicPath,
      filename: '[name].js?[chunkhash:8]',
      chunkFilename: '[name].js?[chunkhash:8]'
    },
  
    plugins: webpackPlugins,
  
    module: {
      rules: webpackRules
    }
}
  
module.exports = webpackConfig;

/*
var path = require('path');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    entry: {
        page1: ['./client/page1', hotMiddlewareScript],
        page2: ['./client/page2', hotMiddlewareScript]
    },
    output: {
        filename: '[name]/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: publicPath
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                name: '[path][name].[ext]?[hash:8]'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = devConfig;
*/
