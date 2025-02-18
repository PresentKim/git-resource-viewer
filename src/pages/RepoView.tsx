import {useEffect, useState} from 'react'
import {
  GitBranchPlusIcon,
  ImageIcon,
  LoaderIcon,
  ServerOffIcon,
} from 'lucide-react'
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
} from '@/lib/randomMessages'

export default function RepoView() {
  const [{owner, repo, ref}, setTargetRepository] = useTargetRepository()
  const [isLoadRef, getDefaultBranch] = usePromise(useGithubDefaultBranch())
  const [isLoadImagePaths, getImagePaths] = usePromise(useGithubImageFileTree())
  const [imageFiles, setImageFiles] = useState<GithubImageFile[] | null>(null)
  const [imageSize] = useState(64)

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

  if (isLoadRef) {
    return (
      <RandomMessageLoader provider={generateBranchFetchMessage}>
        <div className="flex items-center justify-center text-neutral-500 gap-2">
          <GitBranchPlusIcon size={16} />
          loading default branch...
          <LoaderIcon size={16} className="animate-spin" />
        </div>
      </RandomMessageLoader>
    )
  } else if (isLoadImagePaths) {
    return (
      <RandomMessageLoader provider={generateImageFetchMessage}>
        <div className="flex items-center justify-center text-neutral-500 gap-2">
          <ImageIcon size={16} />
          loading images...
          <LoaderIcon size={16} className="animate-spin" />
        </div>
      </RandomMessageLoader>
    )
  } else if (!imageFiles || !imageFiles.length) {
    return (
      <RandomMessageLoader provider={generateNoImagesMessage}>
        <div className="flex items-center justify-center text-neutral-500 gap-2">
          <ImageIcon size={16} />
          no images found...
          <ServerOffIcon size={16} />
        </div>
      </RandomMessageLoader>
    )
  }

  return (
    <div className="flex flex-wrap gap-4">
      {imageFiles.map((path, i) => (
        <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger
              className="aspect-square relative select-none hover:ring-2 ring-white hover:rounded-xs transition-all"
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
              className="min-w-fit p-2 rounded-md bg-neutral-900 text-neutral-100 ring-1 ring-neutral-700">
              <p className="px-2 py-1">{path}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}
