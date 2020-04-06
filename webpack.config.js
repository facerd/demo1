const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 构建html页面
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 清除dist目录
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽出所有的css，放入一个文件

module.exports = env => {

  if(!env){
    env = {};
  }

  let plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './app/views/index.html'
    }),
    new VueLoaderPlugin()
  ]

  if(env.production){
    plugins.push[
        new webpack.DefinePlugin({
          'process.env':{
            NODE_ENV:"production"
          }
        }),
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
    ]
  }

  return {
    entry:{
      app:'./app/js/main.js'
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      }
    },
    module:{
      rules:[{
        test:/\.html$/,
        loader:'html-loader'
      },{
        test:/\.vue$/,
        loader:'vue-loader'
      },{
        test:/\.(sa|sc|c)ss$/,
        chunks: 'all',
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          {
            loader: 'px2rem-loader',
            // options here
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          },
          'sass-loader'
        ]
      }]
    },
    plugins,
    output:{
      filename:'[name].min.js',
      path:path.resolve(__dirname,'dist')
    }
  }
}
