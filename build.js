// import fs from 'node:fs'
import { build } from 'esbuild'

build({
  entryPoints: ['src/script.js'],
  outfile: 'public/output.js',
  bundle: true,
  minify: true,
  // metafile: true,
  target: [
    'firefox112',
    'chrome113'
  ]
}).then(res => {
  console.log('done!')
  res.warnings.forEach(warn => console.warn('warning:', warn))
  res.errors.forEach(err => console.error('error:', err))
  // fs.writeFileSync('meta.json', JSON.stringify(res.metafile))
}).catch(console.error)
