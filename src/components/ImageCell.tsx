import {useCallback, useEffect, useState, memo} from 'react'
import {LoaderCircleIcon} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ImageCellProps {
  owner: string
  repo: string
  ref: string
  path: string
}

function Image({owner, repo, ref, path}: ImageCellProps) {
  const [loading, setLoading] = useState(false)

  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true)
  }, [path])

  return (
    <>
      <div
        className="size-full flex justify-center items-center opacity-5 ring-muted-foreground ring-1 rounded-md"
        style={{display: loading ? 'block' : 'none'}}>
        <LoaderCircleIcon className="size-full object-contain text-muted animate-spin duration-[3s]" />
      </div>
      <img
        src={`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`}
        alt={path}
        className="size-full object-contain"
        onLoad={handleLoad}
        style={{display: loading ? 'none' : 'block'}}
      />
    </>
  )
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
      <Image owner={owner} repo={repo} ref={ref} path={path} />
    </div>
  ) : (
    <TooltipProvider key={path}>
      <Tooltip>
        <TooltipTrigger className="aspect-square size-full ring-foreground transition-all hover:ring-2 hover:rounded-xs">
          <Image owner={owner} repo={repo} ref={ref} path={path} />
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
export {ImageCell}
