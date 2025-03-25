import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// TODO: updated environmentMatchGlobs to workspaces
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
