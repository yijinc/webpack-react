const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    polyfills: './src/polyfills',
    index: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      },
      {
        test: /\.txt/,
        type: 'asset', // 照默认条件，自动地在 resource 和 inline 之间进行选择
        parser: {
         dataUrlCondition: {
           maxSize: 8 * 1024 // 8kb
         }
       }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};