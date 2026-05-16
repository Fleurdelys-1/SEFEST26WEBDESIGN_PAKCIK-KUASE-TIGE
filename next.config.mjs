
const nextConfig = {
  webpack: (config, { isServer }) => {
    
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist/build/pdf.worker.mjs': 'pdfjs-dist/build/pdf.worker.min.mjs',
    };

    if (!isServer) {
      config.resolve.alias['pdfjs-dist/legacy/build/pdf.worker'] = 
        'pdfjs-dist/legacy/build/pdf.worker.min.js';
    }

    return config;
  },
  turbopack: {
    resolveAlias: {
      'pdfjs-dist/build/pdf.worker.mjs': 'pdfjs-dist/build/pdf.worker.min.mjs',
      'pdfjs-dist/legacy/build/pdf.worker': 'pdfjs-dist/legacy/build/pdf.worker.min.js',
    },
  },
};

export default nextConfig;
