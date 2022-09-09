import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig((env) => ({
    build:
        env.mode === 'doc'
            ? { outDir: './doc' }
            : {
                  lib: {
                      entry: resolve(__dirname, 'src/index.ts'),
                      name: 'svga',
                  },
              },
}))
