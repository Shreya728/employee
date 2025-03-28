import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ✅ Ensures correct paths in production
  server: {
    port: 5173, // Default Vite port
  },
});
