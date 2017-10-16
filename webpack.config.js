const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractStylesPlugin = new ExtractTextPlugin('styles.min.css');
const extractHTMLPlugin = new HtmlWebpackPlugin({
  hash: true,
  filename: '../index.html'
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist/assets')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractStylesPlugin.extract([ 'css-loader' ])
      },
      {
        test: /\.less$/i,
        use: extractStylesPlugin.extract([ 'css-loader', 'less-loader' ])
      },
      {
        test: /\.(scss|sass)$/,
        use: extractStylesPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          limit: 50000,
          name: 'fonts/[name].[ext]'
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            } 
          }
        ]
      }
    ]
  },
  plugins: 
  [
    extractStylesPlugin,
    extractHTMLPlugin
  ]
};