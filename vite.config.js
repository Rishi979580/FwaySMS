import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/styles.scss";`,
      },
    },
  },
  // Other configuration options
  optimizeDeps: {
    include: [
      "firebase/app",
      "firebase/database", // Add other Firebase services you need
    ],
  },
  build: {
    outDir: "dist",
  },
});
