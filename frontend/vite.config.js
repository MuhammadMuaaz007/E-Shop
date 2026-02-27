import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    // Uncomment the following for HTTPS local development
    // https: {
    //   key: './certs/localhost-key.pem',
    //   cert: './certs/localhost.pem',
    // },
    cors: {
      origin: ["http://localhost:8000", "https://localhost:8000"],
      credentials: true,
    },
  },
  build: {
    outDir: "dist",
  },
});
