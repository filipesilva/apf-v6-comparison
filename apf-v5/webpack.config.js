const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

module.exports = {
  mode: "development",
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './src/index.html') }),
    new ngToolsWebpack.AngularCompilerPlugin({
      tsConfigPath: './tsconfig.json',
      skipCodeGeneration: true
    }),
    new SpeedMeasurePlugin(),
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loader: '@ngtools/webpack' },
      // Ignore warnings about System.import in Angular.
      { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } },
    ]
  },
  stats: {
    chunks: false,
    modules: false,
  },
  devServer: {
    historyApiFallback: true
  }
};
