const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === "development";
console.log(process.env.NODE_ENV, isDev);
const config = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.[hash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.jsx$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(jpg|jpeg|git|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name]-[contentHash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 定义环境变量值, 不定义项目中获取不到
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? '"development"' : '"production"',
      },
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
};
if (isDev) {
  config.devtool = "#cheap-module-eval-source-map";
  config.devServer = {
    port: "8080",
    host: "0.0.0.0", //便于手机访问
    overlay: {
      errors: true, //编译时错误显示到网页上
    },
    historyApiFallback: true, //路由映射到index.html
    open: 'http://127.0.0.1:8080', //每次都打开一个网页  true
    hot: true, //只渲染一个组件  要加插件new webpack.HotModuleReplacementPlugin()
    inline: true,
  };
  config.module.rules.push({
    test: /\.styl$/,
    use: ["style-loader", "css-loader", {
      loader: "postcss-loader",
      options: {
        sourceMap: true
      }
    }, "stylus-loader"],
  })
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin())

} else {
  // 生产环境
  config.entry = {
    app: "./src/main.js",
    vendor: ["vue"]
  }
  config.output.filename = "[name].[chunkhash:8].js"
  config.module.rules.push({
    test: /\.styl$/,
    use: extractTextWebpackPlugin.extract({ fallback: "style-loader", use: ["css-loader", {
      loader: "postcss-loader",
      options: {
        sourceMap: true
      }
    }, "stylus-loader"]})
  })
  config.plugins.push(
    new extractTextWebpackPlugin({
      filename: 'styles.[contentHash:8].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}
module.exports = config;
