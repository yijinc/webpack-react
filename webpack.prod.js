const path = require('path');
const { merge } = require('webpack-merge');
const WorkboxPlugin = require('workbox-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map', // for debug
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // 每次构建前清理 /dist 文件夹
  },
  plugins: [
   new WorkboxPlugin.GenerateSW({
     // 这些选项帮助快速启用 ServiceWorkers
     // 不允许遗留任何“旧的” ServiceWorkers
     clientsClaim: true,
     skipWaiting: true,
   }),
  ],
});