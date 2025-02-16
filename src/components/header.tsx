import type {ComponentProps} from 'react'
import {cn} from '@/lib/utils'

function HeaderTitle({children, className, ...props}: ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-title"
      className={cn('flex items-center gap-2', className)}
      {...props}>
      {children}
    </div>
  )
}

function HeaderSide({children, className, ...props}: ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-side"
      className={cn('flex items-center gap-2', className)}
      {...props}>
      {children}
    </div>
  )
}

function Header({children, className, ...props}: ComponentProps<'header'>) {
  return (
    <header
      data-slot="header"
      className={cn(
        'flex justify-between items-center align-middle',
        'w-full min-h-8 px-4 py-2',
        'shadow-xs shadow-neutral-800',
        className,
      )}
      {...props}>
      {children}
    </header>
  )
}

export {Header, HeaderTitle, HeaderSide}
