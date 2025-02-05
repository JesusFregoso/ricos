import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { remixDevTools } from 'remix-development-tools';
declare module '@remix-run/server-runtime' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  server: {
    port: 3001,
    warmup: {
      clientFiles: ['./app/entry.client.tsx', './app/root.tsx', './app/routes/**/*'],
    },
    allowedHosts: ['https://947d-2806-101e-a-13df-8c92-69af-9c03-ab8a.ngrok-free.app']
  },
  ssr: {
    noExternal: ['@medusajs/js-sdk'],
  },
  plugins: [
    remixDevTools(),
    remix({
      future: {
        v3_singleFetch: true,
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        unstable_optimizeDeps: true,
      },
    }),
    tsconfigPaths({ root: './' }),
    vanillaExtractPlugin(),
  ],
  build: {},
});
