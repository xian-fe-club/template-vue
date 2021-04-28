/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./src/services/config");
const flag = process.argv.find(item => {
  return item === "build";
});

module.exports = {
  publicPath: flag ? config.cdnBucketPath : "/",
  // 输出静态文件目录
  // assetsDir: 'dist',
  indexPath: "index.html",
  // 配置命令行输出异常 Type: boolean | 'warning' | 'default' | 'error'
  lintOnSave: process.env.NODE_ENV === "production" ? false : "default",
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  chainWebpack: config => {
    config.resolve.alias.set("@", path.resolve("src"));
  },
  pluginOptions: {
    // 配置less 全局变量
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/variables.less")]
    }
  },
  configureWebpack: config => {
    config.resolve.extensions = [".ts", ".js", ".jsx", ".json", ".vue"];
    config.plugins.forEach(val => {
      if (val instanceof HtmlWebpackPlugin) {
        val.options.title = "";
      }
    });
  },
  css: {
    // antd less加载问题
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    // 配置浏览器输出异常
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
