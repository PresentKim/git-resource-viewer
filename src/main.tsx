import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {NuqsHashAdapter} from './utils/NuqsHashAdapter.ts'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsHashAdapter>
      <App />
    </NuqsHashAdapter>
  </StrictMode>,
)
