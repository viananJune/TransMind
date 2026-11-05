import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

// GitHub Pages 没有 SPA 回退。把构建出的 index.html 复制到每个路由目录，
// 深链和刷新才会落到同一份前端。新增顶层页面时，补进 staticRoutes。
const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const index = readFileSync(join(dist, 'index.html'))

const sources = JSON.parse(readFileSync(join(root, 'content/sources.json'), 'utf8'))
const slugs = (dir) =>
  readdirSync(join(root, dir))
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))

const staticRoutes = ['library', 'verification', 'notes', 'digest', 'toolkit', 'about']
const routes = [
  ...staticRoutes,
  ...sources.map((item) => `library/${item.id}`),
  ...slugs('content/notes').map((slug) => `notes/${slug}`),
  ...slugs('content/digests').map((slug) => `digest/${slug}`),
]

for (const route of routes) {
  const file = join(dist, route, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, index)
}

writeFileSync(join(dist, '404.html'), index)
console.log(`pages-routes: wrote ${routes.length} route indexes + 404.html`)
