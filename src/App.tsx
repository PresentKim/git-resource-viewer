import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import BaseLayout from '@/layout/BaseLayout'
import Home from '@/pages/Home'
import Settings from '@/pages/Settings'
import RepoView from '@/pages/RepoView'
import NotFound from '@/pages/NotFound'

function App() {
  return (
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
  )
}

export default App
