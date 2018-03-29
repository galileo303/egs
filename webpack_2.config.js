const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isDev = process.env.NODE_ENV == "dev";
const config = {
    entry:["babel-polyfill",path.join(__dirname, 'src/index.js')],
    output: {
        filename: '[chunkhash]bundle.js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        alias: {
            component: path.resolve(__dirname, 'src/component/'),
            css: path.resolve(__dirname, 'src/public/css/'),
            layer: path.resolve(__dirname, 'src/public/layer/'),
            api: path.resolve(__dirname, 'src/model/')
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                        {
                            loader: 'file-loader'
                        },
                ],
            }
        ]
    },
    optimization:{
        minimize:true,
        minimizer:[
            new UglifyJsPlugin({
                uglifyOptions:{
                    compress: {
                        warnings: false,
                        drop_console: false
                    },
                    sourceMap:true
                }
            }),
        ]
    },
    plugins: [

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"dev"' : '"prd"'
            }
        }),
        new HTMLPlugin({
            template: path.join(__dirname, 'src/index.html'),
            inject: 'body'
        })
    ]
}


if (isDev) {
    config.devtool = "#cheap-module-eval-source-map"
    config.devServer = {
        port: '8003',
        host: '0.0.0.0',
        overlay: {
            errors:true
        },
     }
 }


module.exports = config