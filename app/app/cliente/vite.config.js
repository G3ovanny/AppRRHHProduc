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
  base: "/static/", 
  root: "./src",
  plugins: [
    react(),
  ],
});