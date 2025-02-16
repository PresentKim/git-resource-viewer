import {ImagesIcon as HeaderIcon} from 'lucide-react'
import {Header, HeaderSide, HeaderTitle} from '@/components/header'

export default function Home() {
  return (
    <>
      <Header>
        <HeaderTitle className="select-none">
          <HeaderIcon strokeWidth={3} />
          <b>repo-image-viewer</b>
        </HeaderTitle>
        <HeaderSide> </HeaderSide>
      </Header>
      <main className="flex flex-col flex-1 justify-start items-center min-h-8 w-full px-4 py-8 space-y-6">
        <h1 className="my-2 text-center text-4xl font-bold">Home</h1>
      </main>
    </>
  )
}
