const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: "production",
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
      skipCodeGeneration: false,
      entryModule: 'src/app/app.module#AppModule'
    }),
    new SpeedMeasurePlugin(),
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loader: ['@angular-devkit/build-optimizer/webpack-loader', '@ngtools/webpack'] },
      { test: /\.js$/, loader: '@angular-devkit/build-optimizer/webpack-loader' },
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
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: false,
        parallel: true,
        cache: true,
        uglifyOptions: {
          ecma: 5,
          warnings: false,
          safari10: true,
          compress: {
            pure_getters: true,
            passes: 3,
          },
          output: {
            ascii_only: true,
            comments: false,
            webkit: true,
          },
        }
      }),
    ]
  },
  node: false,
};
