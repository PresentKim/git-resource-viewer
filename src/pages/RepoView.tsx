import {useEffect, useMemo, useState} from 'react'
import {GitBranchPlusIcon, ImageIcon, LoaderIcon} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {RandomMessageLoader} from '@/components/RandomMessageLoader'
import {useTargetRepository} from '@/hooks/useTargetRepository'
import {
  useGithubDefaultBranch,
  useGithubImageFileTree,
  type GithubImageFile,
} from '@/hooks/useGithubApi'
import {usePromise} from '@/hooks/usePromise'
import {
  generateBranchFetchMessage,
  generateImageFetchMessage,
  generateNoImagesMessage,
} from '@/utils/randomMessages'
import {useFilterStore} from '@/stores/useFilterStore'

export default function RepoView() {
  const [{owner, repo, ref}, setTargetRepository] = useTargetRepository()
  const [isLoadRef, getDefaultBranch] = usePromise(useGithubDefaultBranch())
  const [isLoadImagePaths, getImagePaths] = usePromise(useGithubImageFileTree())
  const [imageFiles, setImageFiles] = useState<GithubImageFile[] | null>(null)
  const [imageSize] = useState(64)
  const filter = useFilterStore(state => state.getFilter())
  const filters = useMemo(() => filter.split(' ').filter(Boolean), [filter])

  useEffect(() => {
    if (owner && repo && !ref) {
      getDefaultBranch(owner, repo)
        .then(defaultBranch => setTargetRepository(owner, repo, defaultBranch))
        .catch(console.error)
    } else {
      getImagePaths(owner, repo, ref)
        .then(imageFileTree => setImageFiles(imageFileTree))
        .catch(console.error)
    }
  }, [owner, repo, ref, getDefaultBranch, setTargetRepository, getImagePaths])

  const filteredImageFiles = useMemo(() => {
    return imageFiles?.filter(path => {
      return filters.reduce((acc, filter) => {
        if (!acc || !filter) return acc
        if (filter.startsWith('-')) {
          return !path.includes(filter.slice(1))
        }

        return path.includes(filter)
      }, true)
    })
  }, [imageFiles, filters])

  if (isLoadRef) {
    return (
      <RandomMessageLoader provider={generateBranchFetchMessage}>
        <div className="flex items-center justify-center gap-2 mt-8 text-lg">
          <GitBranchPlusIcon />
          loading default branch...
          <LoaderIcon className="animate-spin" />
        </div>
      </RandomMessageLoader>
    )
  } else if (isLoadImagePaths) {
    return (
      <RandomMessageLoader provider={generateImageFetchMessage}>
        <div className="flex items-center justify-center gap-2 mt-8 text-lg">
          <ImageIcon />
          loading images...
          <LoaderIcon className="animate-spin" />
        </div>
      </RandomMessageLoader>
    )
  } else if (!filteredImageFiles || !filteredImageFiles.length) {
    return <RandomMessageLoader provider={generateNoImagesMessage} />
  }

  return (
    <div className="flex flex-wrap w-full gap-4 ">
      {filteredImageFiles.map((path, i) => (
        <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger
              className="aspect-square relative select-none hover:ring-2 ring-foreground hover:rounded-xs transition-all"
              style={{width: imageSize, height: imageSize}}>
              <img
                src={`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`}
                alt={path}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sticky="partial"
              className="min-w-fit p-2 rounded-md bg-card text-card-foreground ring-1 ring-muted-foreground">
              <p className="px-2 py-1">{path}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}
