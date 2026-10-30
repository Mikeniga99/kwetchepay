import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Mise en cache navigateur longue durée pour les vidéos et médias statiques
  async headers() {
    return [
      {
        source: '/images/:all*(mp4|webm|png|jpg|jpeg|svg|webp|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
