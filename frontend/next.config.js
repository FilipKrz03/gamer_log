/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true , 
    }
}
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'media.rawg.io',
          port : '' , 
          pathname: '/media/**'
        },
      ],
    },
  };