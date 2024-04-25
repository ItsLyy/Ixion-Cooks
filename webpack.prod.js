const { merge } = require('webpack-merge');
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 20,
          progressive: true,
        }),
      ],
    }),
  ],
});
