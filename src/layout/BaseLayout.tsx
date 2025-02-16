import {Outlet} from 'react-router-dom'
import Footer from './Footer'
import {SearchDialog} from '@/components/search-dialog'

export default function BaseLayout() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <Outlet />
      <Footer />
      <SearchDialog />
    </div>
  )
}
