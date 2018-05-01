const path = require('path');

module.exports = (env, argv) => ({
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env', 'react' ] 
          }
        }
      },
      {
        test    : /\.elm$/,
        exclude : [/elm-stuff/, /node_modules/],
        use     : [
          {
            loader  : 'elm-webpack-loader',
            options : {
              debug : argv.mode === 'development',
            }
          }
        ]
      }
    ]
  }
})

