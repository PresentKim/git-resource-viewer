import {Suspense, lazy} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const BaseLayout = lazy(() => import('@/layout/BaseLayout'))
const Home = lazy(() => import('@/pages/Home'))
const Settings = lazy(() => import('@/pages/Settings'))
const RepoView = lazy(() => import('@/pages/RepoView'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function App() {
  return (
    <Suspense fallback={<div className="loading"></div>}>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/:owner/:repo/*" element={<RepoView />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
