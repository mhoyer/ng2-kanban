module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts', 'angular2-template'] },
      { test: /\.html$/, loader: 'html' },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'null' },
      { test: /\.css$/, loader: 'null' }
    ]
  }
}
