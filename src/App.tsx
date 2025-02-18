import {Suspense, lazy} from 'react'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import {LoaderIcon} from 'lucide-react'
import BaseLayout from '@/layout/BaseLayout'

const LazyHome = lazy(() => import('@/pages/Home'))
const LazySettings = lazy(() => import('@/pages/Settings'))
const LazyRepoView = lazy(() => import('@/pages/RepoView'))
const LazyNotFound = lazy(() => import('@/pages/NotFound'))

function App() {
  return (
    <Suspense
      fallback={
        <main className="flex items-center justify-center">
          <LoaderIcon className="size-16 animate-spin" />
        </main>
      }>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<LazyHome />} />
            <Route path="/settings" element={<LazySettings />} />
            <Route path="/:owner/:repo/*" element={<LazyRepoView />} />
          </Route>
          <Route path="*" element={<LazyNotFound />} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
