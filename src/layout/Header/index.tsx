import {cn} from '@/lib/utils'

export default function Header() {
  return (
    <header
      className={cn(
        'flex justify-between items-center align-middle min-h-8 w-full px-4 py-2',
        'shadow-xs shadow-neutral-800',
      )}></header>
  )
}
