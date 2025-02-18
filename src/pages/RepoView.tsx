import {useEffect, useState} from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {useTargetRepository} from '@/hooks/useTargetRepository'
import {
  useGithubDefaultBranch,
  useGithubImageFileTree,
  type GithubImageFile,
} from '@/hooks/useGithubApi'

export default function RepoView() {
  const [{owner, repo, ref}, setTargetRepository] = useTargetRepository()
  const fetchGithubDefaultBranch = useGithubDefaultBranch()
  const fetchGithubImageFileTree = useGithubImageFileTree()
  const [githubImageFiles, setGithubImageFiles] = useState<
    GithubImageFile[] | null
  >(null)
  const [imageSize] = useState(64)

  useEffect(() => {
    if (owner && repo && !ref) {
      fetchGithubDefaultBranch(owner, repo)
        .then(defaultBranch => setTargetRepository(owner, repo, defaultBranch))
        .catch(console.error)
    } else {
      fetchGithubImageFileTree(owner, repo, ref)
        .then(imageFileTree => setGithubImageFiles(imageFileTree))
        .catch(console.error)
    }
  }, [
    owner,
    repo,
    ref,
    fetchGithubDefaultBranch,
    setTargetRepository,
    fetchGithubImageFileTree,
  ])

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {githubImageFiles?.map((path, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger
                className="aspect-square relative select-none hover:ring-2 ring-white hover:rounded-xs transition-all"
                style={{width: imageSize, height: imageSize}}>
                <img
                  src={`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`}
                  alt={path}
                  className="w-full h-full object-contain"
                />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sticky="partial"
                className="min-w-fit p-2 rounded-md bg-neutral-900 text-neutral-100 ring-1 ring-neutral-700">
                <p className="px-2 py-1">{path}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </>
  )
}
