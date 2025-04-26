/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    // Desactivar comprobaciones de ESLint durante la construcción
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorar errores de TypeScript durante la construcción
    ignoreBuildErrors: true,
  },
  experimental: {
    // Configuración para Server Actions
    serverActions: {
      allowedOrigins: ['localhost:3000'],
      enabled: false
    },
  },
};

module.exports = nextConfig;
