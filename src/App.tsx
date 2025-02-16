import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import BaseLayout from '@/layout/BaseLayout'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import RepoView from '@/pages/RepoView'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:owner/:repo/*" element={<RepoView />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
