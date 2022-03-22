import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { build } from 'esbuild'
import rimraf from 'rimraf'
import fg from 'fast-glob'

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
  } catch (err) {
    // console.error(chalk.red(err));
    process.exit(1);
  }
})()

/**
 * Index.
 */
 ;(async () => {
  const entryPoints = await fg('src/**/*.{tsx,ts}', { ignore: ['**/*.d.ts'] })
  await build({
    entryPoints,
    outdir: path.resolve(__dirname, 'dist'),
    tsconfig: '../../tsconfig.json',
    format: 'esm',
  })
})()