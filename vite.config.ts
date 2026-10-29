import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'react': path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      },
      dedupe: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'motion/react',
        'motion',
        'lucide-react',
        'qrcode.react',
      ],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 1200,
      modulePreload: {
        resolveDependencies: (filename, deps, { hostType }) => {
          if (hostType === 'html') {
            return deps.filter(
              (dep) => !dep.includes('vendor-pdf') && !dep.includes('index.es')
            );
          }
          return deps;
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('purify')) {
                return 'vendor-pdf';
              }
              if (id.includes('qrcode.react')) {
                return 'vendor-qr';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('firebase')) {
                return 'vendor-firebase';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('react') || id.includes('scheduler')) {
                return 'vendor-react';
              }
            }
            if (id.includes('/src/data/destinationsData')) {
              return 'data-destinations';
            }
            if (id.includes('/src/data/blogsData')) {
              return 'data-blogs';
            }
            if (id.includes('/src/data/seoPagesData')) {
              return 'data-seo';
            }
            if (id.includes('/src/data/mockData')) {
              return 'data-mock';
            }
          },
        },
      },
    },
  };
});
