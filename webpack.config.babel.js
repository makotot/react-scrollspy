import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlguin from 'html-webpack-plugin'

export default {
  mode: 'production',
  entry: {
    app: [
      './src/js/app.jsx',
    ],
    'app.min': [
      './src/js/app.jsx',
    ],
  },
  resolve: {
    extensions: ['', 'js', 'jsx'],
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
        test: /\.scss$/,
        exclude: /(node_modules)/,
        include: [
          path.resolve(__dirname, 'src/scss'),
        ],
        use: [
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-flexbugs-fixes')(),
                require('autoprefixer')(),
                require('cssnano')(),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
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
        test: /\.(js|jsx)$/,
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
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlguin({
      filename: 'index.html',
      template: './src/templates/index.ejs',
    }),
  ],
}
