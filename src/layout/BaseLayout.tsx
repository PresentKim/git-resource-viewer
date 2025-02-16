import {Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function BaseLayout() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
