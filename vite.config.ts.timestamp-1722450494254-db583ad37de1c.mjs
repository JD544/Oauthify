// vite.config.ts
import { defineConfig } from "file:///D:/Local/ext/Oauthify/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Local/ext/Oauthify/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { extname, relative, resolve } from "path";
import dts from "file:///D:/Local/ext/Oauthify/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///D:/Local/ext/Oauthify/node_modules/vite-plugin-lib-inject-css/dist/index.js";
import { fileURLToPath } from "node:url";
import { glob } from "file:///D:/Local/ext/Oauthify/node_modules/glob/dist/esm/index.js";
import tsconfigPaths from "file:///D:/Local/ext/Oauthify/node_modules/vite-tsconfig-paths/dist/index.mjs";
import typescript2 from "file:///D:/Local/ext/Oauthify/node_modules/rollup-plugin-typescript2/dist/rollup-plugin-typescript2.cjs.js";
var __vite_injected_original_dirname = "D:\\Local\\ext\\Oauthify";
var __vite_injected_original_import_meta_url = "file:///D:/Local/ext/Oauthify/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    tsconfigPaths(),
    dts({
      include: ["lib/**/*.{ts,tsx}"],
      insertTypesEntry: true,
      outDir: "dist/types"
    }),
    typescript2({
      check: false,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: "dist/types",
          emitDeclarationOnly: true
        }
      }
    })
  ],
  build: {
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "axios"],
      input: Object.fromEntries(
        glob.sync("lib/**/*.{ts,tsx}").map((file) => [
          // The name of the entry point
          relative(
            "lib",
            file.slice(0, file.length - extname(file).length)
          ),
          // The absolute path to the entry file
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        dir: "dist",
        assetFileNames: "assets/[name].[ext]",
        entryFileNames: "[name].ts",
        format: "es"
      }
    },
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      name: "Oauthify",
      fileName: (format) => `oauthify.${format}.ts`,
      formats: ["es"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxMb2NhbFxcXFxleHRcXFxcT2F1dGhpZnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXExvY2FsXFxcXGV4dFxcXFxPYXV0aGlmeVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTG9jYWwvZXh0L09hdXRoaWZ5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGV4dG5hbWUsIHJlbGF0aXZlLCByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IHsgbGliSW5qZWN0Q3NzIH0gZnJvbSAndml0ZS1wbHVnaW4tbGliLWluamVjdC1jc3MnXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBnbG9iIH0gZnJvbSAnZ2xvYidcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5pbXBvcnQgdHlwZXNjcmlwdDIgZnJvbSAncm9sbHVwLXBsdWdpbi10eXBlc2NyaXB0MidcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGxpYkluamVjdENzcygpLFxuICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgICBkdHMoe1xuICAgICAgaW5jbHVkZTogWydsaWIvKiovKi57dHMsdHN4fSddLFxuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgIG91dERpcjogJ2Rpc3QvdHlwZXMnLFxuICAgIH0pLFxuICAgIHR5cGVzY3JpcHQyKHtcbiAgICAgIGNoZWNrOiBmYWxzZSxcbiAgICAgIHRzY29uZmlnT3ZlcnJpZGU6IHtcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgICAgZGVjbGFyYXRpb246IHRydWUsXG4gICAgICAgICAgZGVjbGFyYXRpb25EaXI6ICdkaXN0L3R5cGVzJyxcbiAgICAgICAgICBlbWl0RGVjbGFyYXRpb25Pbmx5OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuXG4gIGJ1aWxkOiB7XG4gICAgY29weVB1YmxpY0RpcjogZmFsc2UsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QvanN4LXJ1bnRpbWUnLCAnYXhpb3MnXSxcbiAgICAgIGlucHV0OiBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgIGdsb2Iuc3luYygnbGliLyoqLyoue3RzLHRzeH0nKS5tYXAoZmlsZSA9PiBbXG4gICAgICAgICAgLy8gVGhlIG5hbWUgb2YgdGhlIGVudHJ5IHBvaW50XG4gICAgICAgICAgcmVsYXRpdmUoXG4gICAgICAgICAgICAnbGliJyxcbiAgICAgICAgICAgIGZpbGUuc2xpY2UoMCwgZmlsZS5sZW5ndGggLSBleHRuYW1lKGZpbGUpLmxlbmd0aClcbiAgICAgICAgICApLFxuICAgICAgICAgIC8vIFRoZSBhYnNvbHV0ZSBwYXRoIHRvIHRoZSBlbnRyeSBmaWxlXG4gICAgICAgICAgZmlsZVVSTFRvUGF0aChuZXcgVVJMKGZpbGUsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICAgIF0pXG4gICAgICApLFxuXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZGlyOiAnZGlzdCcsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS5bZXh0XScsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLnRzJyxcbiAgICAgICAgZm9ybWF0OiAnZXMnXG4gICAgICB9XG4gICAgfSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ2xpYi9tYWluLnRzJyksXG4gICAgICBuYW1lOiAnT2F1dGhpZnknLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBvYXV0aGlmeS4ke2Zvcm1hdH0udHNgLFxuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UCxTQUFTLG9CQUFvQjtBQUN0UixPQUFPLFdBQVc7QUFDbEIsU0FBUyxTQUFTLFVBQVUsZUFBZTtBQUMzQyxPQUFPLFNBQVM7QUFDaEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxZQUFZO0FBQ3JCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8saUJBQWlCO0FBUnhCLElBQU0sbUNBQW1DO0FBQWdILElBQU0sMkNBQTJDO0FBVzFNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLGNBQWM7QUFBQSxJQUNkLElBQUk7QUFBQSxNQUNGLFNBQVMsQ0FBQyxtQkFBbUI7QUFBQSxNQUM3QixrQkFBa0I7QUFBQSxNQUNsQixRQUFRO0FBQUEsSUFDVixDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxrQkFBa0I7QUFBQSxRQUNoQixpQkFBaUI7QUFBQSxVQUNmLGFBQWE7QUFBQSxVQUNiLGdCQUFnQjtBQUFBLFVBQ2hCLHFCQUFxQjtBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLHFCQUFxQixPQUFPO0FBQUEsTUFDaEQsT0FBTyxPQUFPO0FBQUEsUUFDWixLQUFLLEtBQUssbUJBQW1CLEVBQUUsSUFBSSxVQUFRO0FBQUE7QUFBQSxVQUV6QztBQUFBLFlBQ0U7QUFBQSxZQUNBLEtBQUssTUFBTSxHQUFHLEtBQUssU0FBUyxRQUFRLElBQUksRUFBRSxNQUFNO0FBQUEsVUFDbEQ7QUFBQTtBQUFBLFVBRUEsY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsUUFDOUMsQ0FBQztBQUFBLE1BQ0g7QUFBQSxNQUVBLFFBQVE7QUFBQSxRQUNOLEtBQUs7QUFBQSxRQUNMLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUN2QyxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVyxZQUFZLE1BQU07QUFBQSxNQUN4QyxTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
