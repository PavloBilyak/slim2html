// import fs from 'node:fs'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { build } from 'esbuild'

build({
  entryPoints: ['src/script.js'],
  outfile: 'public/output.js',
  bundle: true,
  minify: true,
  // metafile: true,
  target: browserslistToEsbuild(),
})
  .then((res) => {
    console.log('done!')
    for (const warn of res.warnings) {
      console.warn('warning:', warn)
    }
    for (const err of res.errors) {
      console.error('error:', err)
    }
    // fs.writeFileSync('meta.json', JSON.stringify(res.metafile))
  })
  .catch(console.error)
