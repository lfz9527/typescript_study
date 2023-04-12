# 环境搭建

```bash
-- 初始化项目
npm init

-- 下载相关依赖
npm install  typescript tslint -g

-- 初始化ts
tsc --init

-- 下载webpack4
npm install webpack-cli webpack-dev-server -D
npm i cross-env -D
npm i ts-loader -D
npm install typescript
```



## 配置 webpack

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  // 控制台只打印错误错误信息
  stats: "errors-only",
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
  },
  resolve: {
    /**extensions扩展名选项在resolve追踪到的文件如果没有扩展名时，
     * 会尝试在其提供的扩展名选项里进行匹配。就如我们常常引入一个js文件时a.js，
     * 会直接写import 'a'而不是import 'a.js'。
     *  */
    extensions: [".js", ".ts", ".tsx"],
    /**
     * 别名配置
     */
    alias: {},
  },
  module: {
    rules: [
      {
        // 匹配后缀为ts 或者tsx的文件
        test: /\.tsx?$/,
        // 使用某些loader去处理相关文件
        use: "ts-loader",
        // 排除某些文件，不需要去处理
        exclude: /node_modules/,
      },
    ],
  },
  // 使用source-map方便代码错误定位，开发是使用，生产环境不要使用
  devtool: process.env.NODE_EVN === "development" ? "inline-source-map" : false,
  devServer: {
    // 本地开发基于dist作为根目录
    contentBase: path.join(__dirname, "dist"),
    // 关闭压缩
    compress: false,
    host: "localhost",
    port: 8089,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
    }),
  ],
};

```

