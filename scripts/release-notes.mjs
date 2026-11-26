import { readFileSync } from 'node:fs'

const tag = process.argv[2]
if (typeof tag !== 'string' || tag.trim() === '') {
  console.error('usage: node scripts/release-notes.mjs <tag>')
  process.exit(1)
}
const version = tag.trim().replace(/^v/u, '')
const lines = readFileSync('CHANGELOG.md', 'utf8').split(/\r?\n/u)
const start = lines.findIndex(line => line.trim() === `## ${version}`)
if (start === -1) {
  console.error(`No CHANGELOG section for ${version}`)
  process.exit(1)
}
let end = lines.length
for (let index = start + 1; index < lines.length; index += 1) {
  if (/^##\s/u.test(lines[index])) {
    end = index
    break
  }
}
const body = lines.slice(start + 1, end).join('\n').trim()
if (body === '') {
  console.error(`Empty CHANGELOG section for ${version}`)
  process.exit(1)
}
console.log("## What's changed")
console.log('')
console.log(body)
console.log('')
console.log('---')
console.log('')
console.log('Install or update from the market index: https://xdlg93.github.io/dsh-sensenova-image/index.json')
