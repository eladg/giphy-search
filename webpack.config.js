var HtmlWebpackPlugin = require('html-webpack-plugin');

var buildPath = "public/";

var config = {
  name: 'vanilla-lightbox',

  entry: "./app/app.js",

  output: {
    path: buildPath,
    filename: "app.bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      }
    ],
  },

  plugins: [new HtmlWebpackPlugin()],
};

module.exports = config;