module.exports = {
  module: {
    rules: [
      {
        test: /\.(mp4|webm|ogg)$/,
        type: 'asset/resource', // Webpack 5
        // Se estiver usando Webpack 4 ou anterior, use o file-loader:
        // use: 'file-loader',
      },
    ],
  },
};
