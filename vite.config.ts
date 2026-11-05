import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// 项目页：https://<user>.github.io/TransMind/
// 自定义域名挂在站点根路径时：CUSTOM_DOMAIN=true npm run build（base 变为 /）
const base = process.env.CUSTOM_DOMAIN === 'true' ? '/' : '/TransMind/'

function redirectRootToBase(): Plugin {
  return {
    name: 'redirect-root-to-base',
    configureServer(server) {
      if (base === '/') return
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? ''
        if (url === '/' || url.startsWith('/?')) {
          res.writeHead(302, { Location: base + url.slice(1) })
          res.end()
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), redirectRootToBase()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
})
