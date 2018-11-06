const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const InterpolateHtmlPlugin = require('./InterpolateHtmlPlugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    
    mode: 'production',
    
    devtool: false,

    output: {
        filename: 'js/[name].[chunkhash:8].bundle.js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/', // http://example.com  // cdn or service
    },

    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                // 生产环境使用 MiniCssExtractPlugin 分离出 CSS 文件
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
        
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            // minimize: true,  //不能在这里做压缩,否则MiniCssExtractPlugin 处理图片将报错
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 50 versions', '> 0.1%', 'Android >= 4.0', 'firefox 15']
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
        new HtmlWebpackPlugin({
            // https://github.com/jantimon/html-webpack-plugin
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            inject: 'body',
            title: 'webpack-react',
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: '' // output.publicPath
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name]-[hash:8].css',
            chunkFilename: 'css/[id]-[chunkhash:8].css'
        }),
        // Generate a manifest file which contains a mapping of all asset filenames
        // to their corresponding output file so that tools can pick it up without
        // having to parse `index.html`.
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {  // https://www.webpackjs.com/plugins/split-chunks-plugin/
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                commons: {
				    chunks: 'initial',
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
            }
        }
    }
});