import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'))

const fail = (message) => {
  console.error(`content check failed: ${message}`)
  process.exit(1)
}

const site = readJson('content/site.json')
const sources = readJson('content/sources.json')
const rubric = readJson('content/rubric.json')
const toolkit = readJson('content/toolkit.json')

if (site.name !== '渡知社 | TransMind') fail('site.name')
if (site.sloganCn !== '渡信息之惑，择真知之源') fail('site.sloganCn')
if (site.sloganEn !== 'Cross the noise, reach the truth.') fail('site.sloganEn')
if (
  site.banner !==
  '专注AI领域优质信息源筛选，过滤流量噱头与低质搬运，沉淀可信的前沿笔记、开源资源、论文与工程实践。'
) {
  fail('site.banner')
}

const navLabels = [
  '源录｜Source Library',
  '甄别｜Verification',
  '手记｜Notes',
  '文摘｜Digest',
  '工具箱｜Toolkit',
]
const navPaths = ['/library', '/verification', '/notes', '/digest', '/toolkit']
if (!Array.isArray(site.nav) || site.nav.length !== navLabels.length) fail('nav length')
site.nav.forEach((item, i) => {
  if (item.label !== navLabels[i] || item.to !== navPaths[i]) fail(`nav[${i}]`)
})
if (site.aboutLabel !== '关于｜About') fail('aboutLabel')

if (!Array.isArray(sources) || sources.length < 6 || sources.length > 10) {
  fail(`sources length ${sources.length}`)
}

const types = new Set(['paper', 'essay', 'repo', 'tool', 'workflow'])
const ids = new Set()
const indexes = new Set()
const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const day = /^\d{4}-\d{2}-\d{2}$/

for (const item of sources) {
  if (!kebab.test(item.id)) fail(`id ${item.id}`)
  if (ids.has(item.id)) fail(`duplicate id ${item.id}`)
  ids.add(item.id)
  if (!/^\d{2}$/.test(item.index)) fail(`index ${item.id}`)
  if (indexes.has(item.index)) fail(`duplicate index ${item.index}`)
  indexes.add(item.index)
  if (!types.has(item.type)) fail(`type ${item.id}`)
  for (const key of ['title', 'titleCn', 'authors', 'venue', 'summary', 'whyItMatters']) {
    if (typeof item[key] !== 'string' || item[key].trim().length < 4) fail(`${item.id}.${key}`)
  }
  if (item.whyItMatters.length < 40) fail(`${item.id}.whyItMatters short`)
  if (!item.url.startsWith('https://')) fail(`${item.id}.url`)
  if (!day.test(item.date) || !day.test(item.added)) fail(`${item.id}.date`)
  if (!Array.isArray(item.tags) || item.tags.length < 2 || item.tags.length > 3) {
    fail(`${item.id}.tags`)
  }
  for (const tag of item.tags) {
    if (!kebab.test(tag)) fail(`${item.id} tag ${tag}`)
  }
  if (item.featured !== undefined && typeof item.featured !== 'boolean') fail(`${item.id}.featured`)
}

if (!sources.some((item) => item.featured)) fail('no featured source')

if (!Array.isArray(rubric.questions) || rubric.questions.length !== 4) fail('rubric questions')
if (!Array.isArray(rubric.reject) || rubric.reject.length < 4) fail('rubric reject')

if (!Array.isArray(toolkit) || toolkit.length < 3) fail('toolkit')
for (const item of toolkit) {
  if (!item.title || !item.titleEn || !item.summary || !Array.isArray(item.steps) || item.steps.length < 2) {
    fail(`toolkit ${item.id}`)
  }
}

function frontmatter(path) {
  const raw = readFileSync(path, 'utf8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) fail(`frontmatter ${path}`)
  const data = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
  for (const key of ['title', 'titleEn', 'date', 'summary']) {
    if (!data[key]) fail(`${path} missing ${key}`)
  }
  if (!day.test(data.date)) fail(`${path} date`)
  if (match[2].trim().length < 80) fail(`${path} body short`)
  return data
}

const notes = readdirSync(join(root, 'content/notes')).filter((name) => name.endsWith('.md'))
const digests = readdirSync(join(root, 'content/digests')).filter((name) => name.endsWith('.md'))
if (notes.length < 3) fail('notes')
if (digests.length < 2) fail('digests')
for (const name of notes) frontmatter(join(root, 'content/notes', name))
for (const name of digests) {
  const data = frontmatter(join(root, 'content/digests', name))
  const related = (data.sources ?? '').split(',').map((part) => part.trim()).filter(Boolean)
  if (related.length < 2) fail(`${name} sources`)
  for (const id of related) {
    if (!ids.has(id)) fail(`${name} unknown source ${id}`)
  }
}

const verification = readFileSync(join(root, 'content/verification.md'), 'utf8')
if (!verification.includes('<!-- rubric -->')) fail('verification split marker')
const about = readFileSync(join(root, 'content/about.md'), 'utf8')
if (!about.includes('渡信息之惑，择真知之源')) fail('about slogan')
if (!about.includes('Cross the noise, reach the truth.')) fail('about slogan en')

console.log(
  `content ok: ${sources.length} sources, ${notes.length} notes, ${digests.length} digests, ${toolkit.length} toolkit entries`,
)
