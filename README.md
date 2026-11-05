# 渡知社 | TransMind

渡信息之惑，择真知之源  
Cross the noise, reach the truth.

专注AI领域优质信息源筛选，过滤流量噱头与低质搬运，沉淀可信的前沿笔记、开源资源、论文与工程实践。

一份个人维护的静态筛选层：源录、甄别、手记、文摘、工具箱。导航中英并列，正文以中文为主，材料标题保留原文。配色是雾蓝、暖灰、浅燕麦，低饱和，没有霓虹科技色。

A personal static filter for high-signal AI sources. Navigation is bilingual; the body is Chinese, with original titles kept. The palette is haze blue, warm gray, and light oat.

---

## 中文

### 本地运行

需要 Node.js 20 或以上。

```bash
npm install
npm run dev
```

开发地址：<http://127.0.0.1:5173/TransMind/>

打开根路径 `/` 会转到 `/TransMind/`，与 GitHub 项目页的前缀一致。

```bash
npm run build    # 类型检查、内容检查、构建
npm run preview  # 预览 dist，地址 http://127.0.0.1:4173/TransMind/
```

`npm run build` 会做三件事：检查 `content/` 是否完整、`tsc --noEmit`、Vite 构建，然后把 `index.html` 复制到每个路由目录和 `404.html`，这样 GitHub Pages 可以打开深链。

### 部署到 GitHub Pages（项目页）

仓库名应为 **TransMind**。默认 `base` 是 `/TransMind/`，对应：

`https://<github-username>.github.io/TransMind/`

1. 把本分支合并进 `main`。
2. 在仓库 Settings → Pages → Build and deployment，Source 选 **GitHub Actions**。
3. `.github/workflows/pages.yml` 会在推送到 `main` 时构建并部署。Pull request 只跑构建，不部署。
4. 首次部署若提示启用 Pages 环境，按 GitHub 的确认完成即可。
5. 站点根目录包含 `.nojekyll`，避免 Jekyll 忽略下划线开头的文件。

### 自定义域名

自定义域名挂在站点根上，和项目页的 `/TransMind/` 前缀不能同时使用。两处都要改：

1. 在 `public/CNAME` 写入域名，一行，不要协议，例如 `notes.example.com`。这个文件会被复制进 `dist`。不要提交占位域名。
2. 用根路径重新构建：

   ```bash
   npm run build:domain
   ```

   等价于 `CUSTOM_DOMAIN=true npm run build`，Vite 的 `base` 变为 `/`。

3. 让 GitHub Actions 也走根路径：在仓库 Settings → Secrets and variables → Actions → Variables，新建变量 `CUSTOM_DOMAIN`，值为 `true`。工作流已经读取这个变量。取消自定义域名时删掉变量和 `public/CNAME`，再按项目页构建。

4. DNS（细节以 GitHub 文档为准）：
   - 子域名：CNAME 指向 `<github-username>.github.io`
   - 根域名：按 GitHub 当前给出的 A / AAAA 记录配置
5. 在 Pages 设置里打开 Enforce HTTPS。

官方说明：<https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>

本地若要预览域名模式的构建，先 `npm run build:domain`，再在 `dist` 的上一级目录起一个静态服务器，使站点位于域名根路径。

### 怎样新增一条源录

编辑 `content/sources.json`，追加一个对象。构建脚本会检查字段。

```json
{
  "id": "short-kebab-name",
  "index": "11",
  "title": "Original Title",
  "titleCn": "一句中文说明",
  "type": "paper",
  "authors": "Author",
  "venue": "Venue",
  "url": "https://example.com/original",
  "date": "2024-01-01",
  "added": "2026-11-05",
  "tags": ["architecture", "foundation"],
  "summary": "它是什么。一到两句。",
  "whyItMatters": "它改变了哪个判断。不要把摘要再翻译一遍。",
  "featured": false
}
```

约定：

- `id`、`index` 唯一。`id` 用小写英文和连字符。`index` 是两位数字，决定目录里的编号。
- `type` 只能是 `paper`、`essay`、`repo`、`tool`、`workflow`。
- `tags` 2 到 3 个，同样用小写英文和连字符，优先复用已有标签。
- `url` 必须是 `https://` 原文，不要聚合页。
- `date` 是原文日期，`added` 是收录日期，格式 `YYYY-MM-DD`。
- `featured: true` 会出现在首页“本期留下”。文件中的顺序就是源录顺序。
- 深链 `/library/<id>/` 会在构建时自动生成，不必改路由脚本。

### 怎样新增手记或文摘

新手记：在 `content/notes/` 增加一个 `.md` 文件。新文摘：在 `content/digests/` 增加。文件名即网址中的 slug。

```markdown
---
title: 标题
titleEn: English title
date: 2026-11-05
summary: 列表页上的一两句介绍。
tags: reading, method
sources: attention, vllm
---

正文。站内链接写成 [源录中的论文](/library/attention)，不要写死域名或 `/TransMind` 前缀。
```

`sources` 只用于文摘，值是源录 `id`，逗号分隔。手记用 `tags`，文摘可以不写 `tags`。

### 怎样改页面文字

| 文件 | 内容 |
| --- | --- |
| `content/site.json` | 站名、两条口号、首页横幅、导航标签 |
| `content/verification.md` | 甄别页正文。保留 `<!-- rubric -->`，四问会插在这里 |
| `content/rubric.json` | 四问，以及不收录的形状 |
| `content/about.md` | 关于页 |
| `content/toolkit.json` | 工具箱步骤 |

导航五字必须保持：`源录｜Source Library`、`甄别｜Verification`、`手记｜Notes`、`文摘｜Digest`、`工具箱｜Toolkit`。分隔符是全角 `｜`。站名、口号、横幅在 `scripts/check-content.mjs` 里有原文校验，改品牌用字时要两处一起改。

新增顶层页面时，要同时改 `src/App.tsx` 的路由，以及 `scripts/pages-routes.mjs` 里的 `staticRoutes`。

### 目录

```text
content/                 源录、手记、文摘、甄别、工具箱
src/                     React 页面
public/                  favicon、.nojekyll、可选 CNAME
scripts/check-content.mjs
scripts/pages-routes.mjs
.github/workflows/pages.yml
```

技术栈：Vite、React、TypeScript。没有账号，没有追踪脚本，内容都在仓库里。

---

## English

TransMind is a static reading room for a personal AI filter: sources worth citing, a verification rubric, notes, short digests, and a small toolkit. It is built with Vite, React, and TypeScript, and it is ready for GitHub Pages.

### Run and build

Node.js 20 or newer.

```bash
npm install
npm run dev
```

Dev server: <http://127.0.0.1:5173/TransMind/>

```bash
npm run build
npm run preview
```

`npm run build` checks content, typechecks, builds, then copies `index.html` into each route directory plus `404.html` so GitHub Pages can serve deep links.

### GitHub Pages (project site)

The repository name should be **TransMind**. The default Vite `base` is `/TransMind/`, which matches:

`https://<github-username>.github.io/TransMind/`

1. Merge into `main`.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. `.github/workflows/pages.yml` deploys on pushes to `main`. Pull requests build only.
4. `.nojekyll` is included so Jekyll does not drop files whose names start with `_`.

### Custom domain

A custom domain is served from the site root, so it cannot keep the `/TransMind/` prefix.

1. Add `public/CNAME` containing only the domain, for example `notes.example.com`. Do not commit a placeholder.
2. Build with a root base:

   ```bash
   npm run build:domain
   ```

3. In GitHub, add an Actions variable named `CUSTOM_DOMAIN` with the value `true`. The workflow passes it through. Remove the variable and `public/CNAME` to go back to the project-page base.
4. DNS: point a subdomain with a CNAME to `<github-username>.github.io`, or follow GitHub’s current A/AAAA records for an apex domain. Then turn on Enforce HTTPS.

Docs: <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>

### Add an entry

- **Source:** append an object to `content/sources.json`. `id` and `index` must be unique. `type` is one of `paper`, `essay`, `repo`, `tool`, `workflow`. Use 2–3 kebab-case tags, an `https://` link to the original, `date` for the work, and `added` for the day you filed it. `whyItMatters` is the point of the card. `featured: true` pins it on the home page. Order in the file is the catalog order. The `/library/<id>/` route is generated at build time.
- **Note:** add `content/notes/<slug>.md`.
- **Digest:** add `content/digests/<slug>.md` and set `sources:` to a comma-separated list of source ids.

Frontmatter:

```markdown
---
title: 标题
titleEn: English title
date: 2026-11-05
summary: One or two sentences for the index.
tags: reading, method
sources: attention, vllm
---
```

Write in-site links as `[label](/library/attention)`. Do not hard-code the domain or the `/TransMind` prefix.

Brand strings and the five navigation labels are checked by `scripts/check-content.mjs`. The labels use a fullwidth bar: `源录｜Source Library`, `甄别｜Verification`, `手记｜Notes`, `文摘｜Digest`, `工具箱｜Toolkit`.

A new top-level page needs a route in `src/App.tsx` and a path in `staticRoutes` inside `scripts/pages-routes.mjs`.

Sample sources are real public papers, essays, repositories, and tools. The short commentary is original and is not a statement by the original authors.
