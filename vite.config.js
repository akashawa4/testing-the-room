import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Inject build-time constants — readable in frontend via import.meta.env
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react'],
          // Separate modal components
          'modals': [
            './src/components/RoomDetailModal.jsx',
            './src/components/AddRoomModal.jsx',
            './src/components/AdminLoginModal.jsx',
            './src/components/GenderSelectionModal.jsx'
          ]
        }
      }
    },
    // Enable minification and tree shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        // IMPORTANT: do NOT drop console logs — they are needed for API
        // debugging on mobile devices where DevTools access is limited.
        // drop_console: true  <-- intentionally disabled
        drop_debugger: true
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})
