const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('./InterpolateHtmlPlugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {

    mode: 'development',
    
    devtool: 'inline-source-map',

    output: {
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true, 
                            localIdentName: '[path][name]_[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 10 versions', '> 0.1%', 'Android >= 4.0', 'firefox 15']
                                }),
                            ],
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: '' // output.publicPath
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, '../public'),
        hot: true,
        port: 3001,
        // proxy: {
        //     '/api': {
        //         target: 'http://207.246.90.98/api',
        //         changeOrigin: true,
        //         secure: true,
        //         autoRewrite: true,
        //         xfwd: true
        //     }
        // }
    }
});