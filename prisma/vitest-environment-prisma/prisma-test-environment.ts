import type { Environment } from 'vitest/environments'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    console.log('executou custom setup')
    // custom setup
    return {
      teardown() {
        // called after all tests with this env have been run
        console.log('tearsdown')
      },
    }
  },
}
