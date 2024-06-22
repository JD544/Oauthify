// vite.config.ts
import { defineConfig } from "file:///D:/Local/ext/Oauthify/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Local/ext/Oauthify/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { extname, relative, resolve } from "path";
import dts from "file:///D:/Local/ext/Oauthify/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///D:/Local/ext/Oauthify/node_modules/vite-plugin-lib-inject-css/dist/index.js";
import { fileURLToPath } from "node:url";
import { glob } from "file:///D:/Local/ext/Oauthify/node_modules/glob/dist/esm/index.js";
var __vite_injected_original_dirname = "D:\\Local\\ext\\Oauthify";
var __vite_injected_original_import_meta_url = "file:///D:/Local/ext/Oauthify/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ["lib"] })
  ],
  build: {
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "axios"],
      input: Object.fromEntries(
        glob.sync("lib/**/*.{ts,tsx}").map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative(
            "lib",
            file.slice(0, file.length - extname(file).length)
          ),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        assetFileNames: "assets/[name].[ext]",
        entryFileNames: "[name].ts"
      }
    },
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      name: "Oauthify",
      fileName: "oauthify",
      formats: ["es"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxMb2NhbFxcXFxleHRcXFxcT2F1dGhpZnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXExvY2FsXFxcXGV4dFxcXFxPYXV0aGlmeVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTG9jYWwvZXh0L09hdXRoaWZ5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGV4dG5hbWUgLHJlbGF0aXZlLCByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IHsgbGliSW5qZWN0Q3NzIH0gZnJvbSAndml0ZS1wbHVnaW4tbGliLWluamVjdC1jc3MnXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBnbG9iIH0gZnJvbSAnZ2xvYidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGxpYkluamVjdENzcygpLFxuICAgIGR0cyh7IGluY2x1ZGU6IFsnbGliJ10gfSksICBcbiAgXSxcblxuICBidWlsZDoge1xuICAgIGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0L2pzeC1ydW50aW1lJywgJ2F4aW9zJyxdLFxuICAgICAgaW5wdXQ6IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgICAgICAgIGdsb2Iuc3luYygnbGliLyoqLyoue3RzLHRzeH0nKS5tYXAoZmlsZSA9PiBbICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIFRoZSBuYW1lIG9mIHRoZSBlbnRyeSBwb2ludFxuICAgICAgICAgICAgICAgICAvLyBsaWIvbmVzdGVkL2Zvby50cyBiZWNvbWVzIG5lc3RlZC9mb29cbiAgICAgICAgICAgICAgICAgcmVsYXRpdmUoXG4gICAgICAgICAgICAgICAgICAgJ2xpYicsXG4gICAgICAgICAgICAgICAgICAgZmlsZS5zbGljZSgwLCBmaWxlLmxlbmd0aCAtIGV4dG5hbWUoZmlsZSkubGVuZ3RoKVxuICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAvLyBUaGUgYWJzb2x1dGUgcGF0aCB0byB0aGUgZW50cnkgZmlsZVxuICAgICAgICAgICAgICAgICAvLyBsaWIvbmVzdGVkL2Zvby50cyBiZWNvbWVzIC9wcm9qZWN0L2xpYi9uZXN0ZWQvZm9vLnRzXG4gICAgICAgICAgICAgICAgIGZpbGVVUkxUb1BhdGgobmV3IFVSTChmaWxlLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICApLFxuXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLltleHRdJyxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0udHMnLFxuICAgICAgfVxuICAgIH0sXG4gICAgICBsaWI6IHtcbiAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnbGliL21haW4udHMnKSxcbiAgICAgICAgbmFtZTogJ09hdXRoaWZ5JyxcbiAgICAgICAgZmlsZU5hbWU6ICdvYXV0aGlmeScsXG4gICAgICAgIGZvcm1hdHM6IFsnZXMnXSxcbiAgICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UCxTQUFTLG9CQUFvQjtBQUN0UixPQUFPLFdBQVc7QUFDbEIsU0FBUyxTQUFTLFVBQVUsZUFBZTtBQUMzQyxPQUFPLFNBQVM7QUFDaEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxZQUFZO0FBTnJCLElBQU0sbUNBQW1DO0FBQWdILElBQU0sMkNBQTJDO0FBUzFNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7QUFBQSxFQUMxQjtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLElBQ2YsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFNBQVMscUJBQXFCLE9BQVE7QUFBQSxNQUNqRCxPQUFPLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxtQkFBbUIsRUFBRSxJQUFJLFVBQVE7QUFBQTtBQUFBO0FBQUEsVUFHekM7QUFBQSxZQUNFO0FBQUEsWUFDQSxLQUFLLE1BQU0sR0FBRyxLQUFLLFNBQVMsUUFBUSxJQUFJLEVBQUUsTUFBTTtBQUFBLFVBQ2xEO0FBQUE7QUFBQTtBQUFBLFVBR0EsY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsUUFDOUMsQ0FBQztBQUFBLE1BQ0g7QUFBQSxNQUVQLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLElBQ0UsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUN2QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsRUFDSjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
