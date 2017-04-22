import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlguin from 'html-webpack-plugin';

export default {
  entry: {
    app: [
      './src/js/app.jsx',
    ],
  },
  resolve: {
    extensions: ['', 'js', 'jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: 'http://localhost:8080',
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
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlguin({
      filename: 'index.html',
      inject: true,
      template: './src/templates/index.ejs',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')(),
          require('postcss-normalize')(),
          require('cssnano')(),
        ],
      },
    }),
  ],
}
