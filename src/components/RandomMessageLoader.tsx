import {useMemo} from 'react'
import type {RandomMessageGenerator} from '@/lib/randomMessages'
import {cn} from '@/lib/utils'

interface Props extends React.ComponentProps<'div'> {
  provider: RandomMessageGenerator
}

export function RandomMessageLoader({
  provider,
  className,
  children,
  ...props
}: Props) {
  const {title, description, footer} = useMemo(provider, [provider])

  return (
    <div
      className={cn(
        'flex flex-col items-center max-w-md mx-auto p-6 space-y-4 text-center',
        className,
      )}
      {...props}>
      <h2 className="text-2xl font-bold text-neutral-200">{title}</h2>
      <p className="text-neutral-400">{description}</p>
      <footer className="text-sm text-neutral-400 italic">{footer}</footer>
      {children}
    </div>
  )
}
