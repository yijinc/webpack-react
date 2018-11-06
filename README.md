# webpack-react
基于 `react`，最新 `webpack` 构建练习，便于手动拓展

---

根据最新 [webpack](https://webpack.docschina.org/concepts/) 文档构建，文件目录参照  [create-react-app](https://github.com/facebook/create-react-app) 生成的

- `jsx|js` ：使用 [babel-loader](https://github.com/babel/babel-loader) ，**options** 配置在根目录 `.babelrc` 中，这里 plugins 引入了全部插件，相当于以前的 `preset-stage-0`

- `less|css`：在 [css-loader](https://github.com/webpack-contrib/css-loader) 中开启 [CSS Modules](http://www.ruanyifeng.com/blog/2016/06/css_modules.html) 功能，开发环境直接放在 `head > style` 中， 生产环境使用 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 提取到文件（页面的并行加载能力）之前的 extract-text-webpack-plugin 在webpack4后已弃用

- `index.html` ：使用 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) ，`InterpolateHtmlPlugin.js`为子插件，为了替代模版中的 `%PUBLIC_URL%` ，这个只能放在HtmlWebpackPlugin之后。public文件夹下的文件并没有被复制到目标dist目录，可以使用 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) 复制，或者在 `InterpolateHtmlPlugin.js`中自定义写入


推荐一些常用插件
- rem布局 [px2rem-postcss](https://github.com/songsiqi/px2rem-postcss)
- 雪碧图自动生成工具 [webpack-spritesmith](https://github.com/mixtur/webpack-spritesmith)
- 打包外的文件复制 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) 