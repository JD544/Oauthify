import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { extname, relative, resolve } from 'path'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import tsconfigPaths from 'vite-tsconfig-paths'
import typescript2 from 'rollup-plugin-typescript2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    tsconfigPaths(),
    dts({
      include: ['lib/**/*.{ts,tsx}'],
      insertTypesEntry: true,
      outDir: 'dist/types',
    }),
    typescript2({
      check: false,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist/types',
          emitDeclarationOnly: true
        }
      }
    })
  ],

  build: {
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'axios'],
      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx}').map(file => [
          // The name of the entry point
          relative(
            'lib',
            file.slice(0, file.length - extname(file).length)
          ),
          // The absolute path to the entry file
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),

      output: {
        dir: 'dist',
        assetFileNames: 'assets/[name].[ext]',
        entryFileNames: '[name].ts',
        format: 'es'
      }
    },
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Oauthify',
      fileName: (format) => `oauthify.${format}.ts`,
      formats: ['es'],
    },
  },
})
