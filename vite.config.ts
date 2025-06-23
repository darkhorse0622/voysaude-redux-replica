import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    proxy: {
      '/api/typeform': {
        target: 'https://api.typeform.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/typeform/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));