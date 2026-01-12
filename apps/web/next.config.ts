import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // Enable React strict mode for development
    reactStrictMode: true,
    transpilePackages: ['@ai-fitness/shared'],
    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            'react-native$': 'react-native-web',
        };
        return config;
    },
}

export default nextConfig
