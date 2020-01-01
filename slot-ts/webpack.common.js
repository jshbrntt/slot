const path = require('path');

module.exports = {
  entry: './src/SlotEngine.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'slot.bundle.js'
  },
  resolve: {
    alias: {
      'openfl': path.resolve(__dirname, 'node_modules/openfl/lib/openfl')
    },
    extensions: [
      '.ts',
      '.tsx',
      '.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
};
