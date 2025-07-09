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

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  // This line makes sure routing fallback works
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})



// vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//   },
//   build: {
//     outDir: 'dist',
//   },
  
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
  
//   base: '/',
//   assetsInclude: ['**/*.html'],
  
//   server: {
//     historyApiFallback: true,
//   },
// })


