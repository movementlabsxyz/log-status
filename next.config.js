/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = { 
            fs: false,
            dns: false, 
            net : false,
            os : false,
            tls : false
        };
  
      return config;
    },
};

module.exports = nextConfig

