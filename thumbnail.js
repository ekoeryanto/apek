const path = require('path')
const sharp = require('sharp')

const args = process.argv.slice(2).map(p => path.resolve(p))

args.forEach(file => {
  const thumbPath = toThumbPath(file)
  console.log(`creating tumbnail for ${file}`)

  sharp(file)
    .resize(30)
    .toFile(thumbPath)
    .catch(e => console.error(`can't process ${file}`, e))
    .then(a => {
      console.log(`tumbnail created in ${thumbPath}`)
    })
})

function toThumbPath(src, dir = 'small') {
  const ps = src.split(path.sep)
  ps.splice(ps.length - 1, 0, 'small')
  return ps.join(path.sep)
}