import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Digest } from './pages/Digest'
import { DigestPage } from './pages/DigestPage'
import { Home } from './pages/Home'
import { Library } from './pages/Library'
import { NotePage } from './pages/NotePage'
import { Notes } from './pages/Notes'
import { NotFound } from './pages/NotFound'
import { SourceDetail } from './pages/SourceDetail'
import { Toolkit } from './pages/Toolkit'
import { Verification } from './pages/Verification'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="library/:id" element={<SourceDetail />} />
          <Route path="verification" element={<Verification />} />
          <Route path="notes" element={<Notes />} />
          <Route path="notes/:slug" element={<NotePage />} />
          <Route path="digest" element={<Digest />} />
          <Route path="digest/:slug" element={<DigestPage />} />
          <Route path="toolkit" element={<Toolkit />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
