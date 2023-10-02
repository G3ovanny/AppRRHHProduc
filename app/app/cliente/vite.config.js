import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    // rollupOptions: {
    //   external: ["react"],
    //   output: {
    //     globals: {
    //       react: "React",
    //     },
    //   },
    // },
  },
  base: process.env.mode === "production" ? "/staticfiles" : "/", 
  root: "./src",
  plugins: [
    react(),
  ],
});