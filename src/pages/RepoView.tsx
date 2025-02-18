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
import {usePromise} from '@/hooks/usePromise'

function LoadingBranch() {
  return <div>Loading default branch...</div>
}

function LoadingImageFiles() {
  return <div>Loading image files...</div>
}

function NoImageFiles() {
  return <div>No image files found</div>
}

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
    return <LoadingBranch />
  } else if (isLoadImagePaths) {
    return <LoadingImageFiles />
  } else if (!imageFiles || !imageFiles.length) {
    return <NoImageFiles />
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
