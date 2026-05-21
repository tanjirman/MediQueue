/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
       
      },
    ],
  },
  
  reactCompiler: true,
};

export default nextConfig;
