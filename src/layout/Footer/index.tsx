import {TbBrandGithubFilled} from 'react-icons/tb'
import {cn} from '@/lib/utils'

const underlineHoverAnimation = cn(
  'relative',
  'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full',
)

export default function Footer() {
  return (
    <footer className="my-4 flex w-full items-center justify-center gap-0.5 text-xs text-neutral-400">
      <TbBrandGithubFilled className="size-3" />
      <a
        href="https://github.com/PresentKim"
        target="_blank"
        rel="noopener noreferrer"
        className={underlineHoverAnimation}>
        PresentKim
      </a>
      <p>/</p>
      <a
        href="https://github.com/PresentKim/repo-image-viewer"
        target="_blank"
        rel="noopener noreferrer"
        className={underlineHoverAnimation}>
        repo-image-viewer
      </a>
    </footer>
  )
}
