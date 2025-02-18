import {useCallback} from 'react'
import {PickaxeIcon, SearchIcon} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {useTargetRepository} from '@/hooks/useTargetRepository'
import {useSearchDialogStore} from '@/stores/searchDialogStore'

export default function Home() {
  const openSearchDialog = useSearchDialogStore(state => state.open)
  const [, setTargetRepository] = useTargetRepository()

  const openExampleRepository = useCallback(
    () => setTargetRepository('Mojang', 'bedrock-samples', 'main'),
    [setTargetRepository],
  )

  return (
    <>
      <h1 className="text-center text-3xl font-bold">
        Github Repository Image Viewer
      </h1>
      <p className="text-center text-lg text-neutral-400 max-w-2xl">
        Browse and view all images in GitHub repository at once. Simply enter a
        repository URL to get started.
      </p>
      <Button onClick={openSearchDialog} className="ring-neutral-400">
        <SearchIcon className="size-5 mr-2" />
        Search Repository
      </Button>
      <p className="text-center text-neutral-400">or</p>
      <Button onClick={openExampleRepository} className="ring-neutral-400">
        <PickaxeIcon strokeWidth={3} />
        Open example repository
      </Button>
    </>
  )
}
