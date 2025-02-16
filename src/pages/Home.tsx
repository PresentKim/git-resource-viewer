import {ImagesIcon as HeaderIcon, PickaxeIcon, SearchIcon} from 'lucide-react'
import {Header, HeaderSide, HeaderTitle} from '@/components/header'
import {Button} from '@/components/ui/button'
import {useTargetRepository} from '@/hooks/useTargetRepository'
import {useSearchDialogStore} from '@/stores/searchDialogStore'

export default function Home() {
  const {open: openSearchDialog} = useSearchDialogStore()
  const [, setTargetRepository] = useTargetRepository()
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
        <h1 className="text-center text-3xl font-bold">
          Github Repository Image Viewer
        </h1>
        <p className="text-center text-lg text-neutral-400 max-w-2xl">
          Browse and view all images in GitHub repository at once. Simply enter
          a repository URL to get started.
        </p>
        <Button onClick={openSearchDialog} className="ring-neutral-400">
          <SearchIcon className="size-5 mr-2" />
          Search Repository
        </Button>
        <p className="text-center text-neutral-400">or</p>
        <Button
          onClick={() =>
            setTargetRepository('Mojang', 'bedrock-samples', 'main')
          }
          className="ring-neutral-400">
          <PickaxeIcon strokeWidth={3} />
          Open example repository
        </Button>
      </main>
    </>
  )
}
