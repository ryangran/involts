import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — loaded on every page, cache forever
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Animation lib — large, shared across all pages
          "vendor-framer": ["framer-motion"],
          // Supabase — only needed on admin/revendedor pages
          "vendor-supabase": ["@supabase/supabase-js"],
          // Heavy data-viz libs — only used on assistencia page
          "vendor-maps": ["react-simple-maps", "recharts"],
          // Form validation stack
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
    // Raise warning threshold to 600 KB — legitimate large chunks (framer, maps)
    chunkSizeWarningLimit: 600,
  },
}));
