const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    mode: 'none',

    entry: {
        polyfills: path.resolve(__dirname, './polyfills.js'),
        index: path.resolve(__dirname, '../src/index.js')
    },

    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 18000,
                        name: 'images/[hash:16].[ext]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        })
    ]
};