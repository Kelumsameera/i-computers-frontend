// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// vitejs.dev
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // This makes Vite listen on all network interfaces
  },
});
