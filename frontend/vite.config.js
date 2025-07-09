// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

// export default defineConfig({
//   plugins: [
//     react(),
//     viteStaticCopy({
//       targets: [
//         {
//           src: 'public/_redirects',
//           dest: ''
//         }
//       ]
//     })
//   ]
// });


// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  
  base: '/',
  assetsInclude: ['**/*.html'],
  
  server: {
    historyApiFallback: true,
  },
})


