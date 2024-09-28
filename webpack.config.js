const path = require('path');

module.exports = {
  entry: './block.js', // Path to your block's entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'block.bundle.js', // The compiled file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Transpile modern JS and JSX
          },
        },
      },
    ],
  },
};
