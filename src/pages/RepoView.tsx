import {useCallback, useEffect, useMemo, useState, memo} from 'react'
import {GitBranchPlusIcon, ImageIcon, LoaderIcon} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {RandomMessageLoader} from '@/components/RandomMessageLoader'
import {
  VirtualizedFlexGrid,
  type RenderData,
} from '@/components/VitualizedFlexGrid'
import {useGithubDefaultBranch} from '@/api/github/hooks/useGithubDefaultBranch'
import {useGithubImageFileTree} from '@/api/github/hooks/useGithubImageFileTree'
import type {GithubImageFileTree} from '@/api/github/types'
import {useTargetRepository} from '@/hooks/useTargetRepository'
import {useFilterQuery} from '@/hooks/useFilterQuery'
import {usePromise} from '@/hooks/usePromise'
import {
  generateBranchFetchMessage,
  generateImageFetchMessage,
  generateNoImagesMessage,
} from '@/utils/randomMessages'

interface ImageCellProps {
  owner: string
  repo: string
  ref: string
  path: string
}

const ImageCell = memo(function ImageCell({
  owner,
  repo,
  ref,
  path,
}: ImageCellProps) {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  return isTouchDevice ? (
    <div className="aspect-square size-full ring-foreground transition-all active:ring-2 active:rounded-xs">
      <img
        src={`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`}
        alt={path}
        className="size-full object-contain"
      />
    </div>
  ) : (
    <TooltipProvider key={path}>
      <Tooltip>
        <TooltipTrigger className="aspect-square size-full ring-foreground transition-all hover:ring-2 hover:rounded-xs">
          <img
            src={`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`}
            alt={path}
            className="size-full object-contain"
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
  )
})

export default function RepoView() {
  const [{owner, repo, ref}, setTargetRepository] = useTargetRepository()
  const [isLoadRef, getDefaultBranch] = usePromise(useGithubDefaultBranch())
  const [isLoadImagePaths, getImagePaths] = usePromise(useGithubImageFileTree())
  const [imageFiles, setImageFiles] = useState<GithubImageFileTree | null>(null)

  const [filter] = useFilterQuery()
  const filters = useMemo(() => filter.split(' ').filter(Boolean), [filter])

  const columnCount = useMemo(() => {
    const ASPECT_ITEM_SIZE = 64
    const calculatedColumns = Math.floor(window.innerWidth / ASPECT_ITEM_SIZE)
    return Math.max(2, Math.min(calculatedColumns, 15))
  }, [])

  useEffect(() => {
    if (owner && repo && !ref) {
      getDefaultBranch({owner, repo})
        .then(defaultBranch => setTargetRepository(owner, repo, defaultBranch))
        .catch(console.error)
    } else {
      getImagePaths({owner, repo, ref})
        .then(imageFileTree => setImageFiles(imageFileTree))
        .catch(console.error)
    }
  }, [owner, repo, ref, getDefaultBranch, setTargetRepository, getImagePaths])

  const filteredImageFiles = useMemo(() => {
    const result = imageFiles?.filter(path => {
      return filters.reduce((acc, filter) => {
        if (!acc || !filter) return acc
        if (filter.startsWith('-')) {
          return !path.includes(filter.slice(1))
        }

        return path.includes(filter)
      }, true)
    })
    return result
  }, [imageFiles, filters])

  const itemRenderer = useCallback(
    ({index, item}: RenderData<string>) => (
      <ImageCell key={index} owner={owner} repo={repo} ref={ref} path={item} />
    ),
    [owner, repo, ref],
  )

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
    <VirtualizedFlexGrid
      items={filteredImageFiles}
      columnCount={columnCount}
      overscan={5}
      gap={10}
      render={itemRenderer}
    />
  )
}
