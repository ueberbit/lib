import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
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

/**
 * Build Css.
 */
;(async () => {
  const files = await fg('src/**/*.css')
  for(const src of files) {
    const dist = src.replace('src', 'dist')
    const css = await fs.promises.readFile(src)
    fs.existsSync(dist) || fs.mkdirSync(path.resolve(__dirname, path.dirname(dist)), { recursive: true })
    postcss([postcssNested, cssnano])
      .process(css, {
        from: src,
        to: dist,
      }).then(result => fs.promises.writeFile(dist, result.css))
  }
})()
