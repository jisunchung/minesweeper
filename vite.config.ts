import { resolve } from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgrPlugin from "vite-plugin-svgr";
// import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "@assets", replacement: resolve(__dirname, "src/assets") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      { find: "@utils", replacement: resolve(__dirname, "src/utils") },
      { find: "@types", replacement: resolve(__dirname, "src/types") },
      { find: "@atoms", replacement: resolve(__dirname, "src/atoms") },
    ],
  },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "src"),
  //     "@assets": path.resolve(__dirname, "src/assets"),
  //     "@components": path.resolve(__dirname, "src/components"),
  //     "@utils": path.resolve(__dirname, "src/utils"),
  //     "@types": path.resolve(__dirname, "src/types"),
  //     "@atoms": path.resolve(__dirname, "src/atoms"),
  //   },
  // },
  // Yarn Berry 호환성을 위한 설정
  optimizeDeps: {
    force: true,
  },
  // Yarn 캐시 관련 오류 방지
  clearScreen: false,
});
