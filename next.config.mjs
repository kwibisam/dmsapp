/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    webpack: (config,  { isServer }) => {
        config.resolve.alias.canvas = false;
        if (!isServer) {
            // Ensure that all imports of 'yjs' resolve to the same instance
            config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs')
          }
        return config;
    },
};

export default nextConfig;
