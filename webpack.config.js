const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  output: {
    path: root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
        'skeleton-css': 'skeleton-css/css/skeleton.css'
    }
  },

  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file-loader?name=assets/[name].[hash].[ext]' },
      { test: /\.css$/, exclude: root('src', 'app'), loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.css$/, include: root('src', 'app'), loader: 'raw-loader' }
    ]
  },

  plugins: [
    new CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'] }),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, './src')
    )
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },
};

// helpers

function root(args) {
  const _root = path.resolve(__dirname, '..');
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
