const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 清楚打包之后多余的, 不确定的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 静态资源打包原样输出
const CopyWebpackPlugin = require('copy-webpack-plugin')

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist')
  },
  module: {
    rules: [
      { test: /\.(scss|sass|css)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
      { test: /\.js$/, loader: 'babel-loader' },
      {
        test:/\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader:'url-loader',
            options:{
              limit:100000,
            }
          }
        ]
      }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'assets'),
          to: 'assets'
        }
      ]
    }),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin(), new TerserPlugin()],
  }
};