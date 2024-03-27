/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'steamusercontent-a.akamaihd.net',
          },
          {
            protocol: 'https',
            hostname: 'steamcdn-a.akamaihd.net',
          },
          {
            protocol: 'https',
            hostname: 'cloud-3.steamusercontent.com',
          },
          {
            protocol: 'http',
            hostname: 'cloud-3.steamusercontent.com',
          },
        ],
      },
};

export default nextConfig;
