import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import fg from 'fast-glob'
import { build as esbuild } from 'esbuild'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import postcssNested from 'postcss-nested'
import cssnano from 'cssnano'
import rimraf from 'rimraf'

const __dirname = path.resolve()

/**
 * Check if dist dir is present.
 */
fs.existsSync(path.resolve(__dirname, 'dist')) ||
  fs.mkdirSync(path.resolve(__dirname, 'dist'))

/**
 * Clean Output dir.
 */
rimraf.sync(`${path.resolve(__dirname, './dist/')}/*`)

;(async () => {
  try {
    // console.log('Running the TypeScript compiler...')
    execSync(`tsc --declaration --emitDeclarationOnly`, { stdio: 'inherit' });
    execSync(`pnpm cem`, { stdio: 'inherit' });
    execSync(`pnpm vscode`, { stdio: 'inherit' });
  } catch (err) {
    process.exit(1);
  }
})()

/**
 * Build Css.
 */
;(async () => {
  const files = await fg('src/**/*.styles.css')
  for(const src of files) {
    const dist = src.replace('src', 'dist').replace('css', 'js')
    const css = await fs.promises.readFile(src)
    fs.existsSync(dist) || fs.mkdirSync(path.resolve(__dirname, path.dirname(dist)), { recursive: true })
    postcss([autoprefixer, postcssNested, cssnano])
      .process(css, {
        from: src,
        to: dist,
      }).then(result => fs.promises.writeFile(dist, `export default \`${result.css}\``))
  }
})()

/**
 * Build Custom Elements.
 */
;(async () => {
  const entryPoints = await fg('src/**/*.{tsx,ts}', { ignore: ['**/*.d.ts'] })
  await esbuild({
    entryPoints,
    outdir: path.resolve(__dirname, 'dist'),
    format: 'esm',
    tsconfig: 'tsconfig.json',
    plugins: [
      {
        name: 'css-to-js',
        setup(build) {
          build.onLoad({ filter: /\.tsx?$/ }, async (args) => {
            let text = await fs.promises.readFile(args.path, 'utf8')
            text = text.replace('.styles.css', '.styles.js')
            text = `import { JSX } from '@ueberbit/utilities'
            ${text}`
            return {
              contents: text,
              loader: 'tsx',
            }
          })
        }
      }
    ],
  })
})()
