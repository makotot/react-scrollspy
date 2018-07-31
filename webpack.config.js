const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlguin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: [
      './src/js/index.js',
    ],
  },
  resolve: {
    extensions: ['', 'js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: [
          path.resolve(__dirname, 'src/js'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: [
          path.resolve(__dirname, 'src/js'),
        ],
        use: [
          {
            loader: 'eslint-loader',
            options: {
            },
          },
        ],
      },
    ],
  },
  serve: {
    dev: {
      contentBase: './dist',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    hot: {
      hot: true,
      reload: true,
    },
    host: '0.0.0.0',
  },
  plugins: [
    new HtmlWebpackPlguin({
      filename: 'index.html',
      inject: false,
      template: './src/templates/index.ejs',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')(),
          require('cssnano')(),
        ],
      },
    }),
  ],
}
