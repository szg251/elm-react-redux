const path = require('path');

module.exports = {
  entry: './src/elm-react.jsx',
  output : {
    path     : path.resolve(__dirname, 'dist'),
    filename : 'elm-react.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-2'],
          }
        }
      }
    ]
  }
}
