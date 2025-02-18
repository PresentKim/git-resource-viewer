import {Fragment} from 'react'
import {cn} from '@/lib/utils'

interface BreadcrumbProps {
  items: (string | null)[]
  className?: React.HTMLAttributes<HTMLSpanElement>['className']
  separatorClassName?: string
  ellipsisLength?: number
  separator?: React.ReactNode | null
}

export function BreadcrumbList({
  items,
  className,
  separator,
}: React.ComponentProps<React.FC<BreadcrumbProps>>) {
  return (
    <div className="flex flex-wrap flex-1 gap-x-0.5">
      {items.map(
        (item, index) =>
          item && (
            <Fragment key={index}>
              {index > 0 && (separator || <span>/</span>)}
              <span
                key={index}
                className={cn(
                  'whitespace-nowrap overflow-hidden text-ellipsis min-w-0 max-w-full',
                  className,
                )}>
                {item}
              </span>
            </Fragment>
          ),
      )}
    </div>
  )
}
