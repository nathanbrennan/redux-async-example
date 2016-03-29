var path = require('path');
module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'web'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // or 'babel-loader'
        query: {
          plugins: ['transform-object-assign'],
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
