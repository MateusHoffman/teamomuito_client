/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Adiciona suporte para arquivos de vídeo (mp4, webm, ogg)
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/i,
      type: 'asset/resource', // Usar a feature de Webpack 5 para arquivos binários
    });

    return config;
  },
};

export default nextConfig;
