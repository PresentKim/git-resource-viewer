import {ImagesIcon as HeaderIcon} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Header, HeaderSide, HeaderTitle} from '@/components/header'
import {BreadcrumbList} from '@/components/breadcrumb-list'
import {useSearchDialogStore} from '@/stores/searchDialogStore'
import {useTargetRepository} from '@/hooks/useTargetRepository'
import {Button} from '@/components/ui/button'

export default function RepoView() {
  const [targetRepository] = useTargetRepository() // extracting repoId from params
  const {owner, repo, ref} = targetRepository
  const {open: openSearchDialog} = useSearchDialogStore()

  return (
    <>
      <Header>
        <HeaderTitle>
          <HeaderIcon strokeWidth={3} />
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer">
              <BreadcrumbList
                items={[owner, repo, ref]}
                className="text-nowrap"
                separator={<span className="text-neutral-500">/</span>}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <a
                  href={`https://github.com/${owner}/${repo}${ref ? `/tree/${ref}` : ''}`}
                  target="_blank"
                  rel="noreferrer">
                  View on GitHub
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button variant="ghost" onClick={openSearchDialog}>
                  Open New Repository
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </HeaderTitle>
        <HeaderSide> </HeaderSide>
      </Header>
      <main className="flex flex-wrap flex-1 justify-center items-center align-middle min-h-8 w-full px-4 py-2">
        <div>
          <p>Owner: {owner}</p>
          <p>Repository: {repo}</p>
          <p>Branch/Tag: {ref}</p>
        </div>
      </main>
    </>
  )
}
