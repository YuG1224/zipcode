const path = require('path')

module.exports = {
  entry: {
    main: './src/client/index.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve('dist/client')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        }
      }
    ]
  },
  devServer: {
    proxy: {
      '/.netlify': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/.netlify/functions': ''
        }
      }
    }
  }
}
