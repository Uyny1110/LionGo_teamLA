import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 如果你是 Project Pages，網址為：https://<user>.github.io/LionGo_teamLA/
// base 必須是 "/LionGo_teamLA/"（前後斜線都要）
export default defineConfig({
  plugins: [react()],
  base: "/LionGo_teamLA/",

  server: {
    port: 3000,
    host: "0.0.0.0",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
