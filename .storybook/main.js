const path = require('path')

module.exports = {
  stories: [
    '../packages/**/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/web-components',
  core: { builder: '@storybook/builder-vite' },
  async viteFinal(config) {
    config.base = './'
    config.esbuild = {
      jsxInject: `import { JSX } from '@ueberbit/utilities'`
    }
    config.resolve = {
      alias: {
        '@ueberbit/utilities': `${path.resolve(__dirname, '../packages/utils/src/index.ts')}/`,
        '@ueberbit/custom-elements': `${path.resolve(__dirname, '../packages/custom-elements/src/index.ts')}/`,
        '~helper': `${path.resolve(__dirname, '../helper/index.ts')}/`,
      },
    }
    return config
  },
}
