import React, {Fragment} from 'react'
import {cn} from '@/lib/utils'

interface BreadcrumbProps extends React.ComponentProps<'span'> {
  items: (string | null)[]
  separator?: React.ReactNode | null
}

export function BreadcrumbList({items, separator, className}: BreadcrumbProps) {
  return (
    <div className="flex flex-wrap flex-1 gap-x-1">
      {items.map(
        (item, index) =>
          item && (
            <Fragment key={index}>
              {index > 0 &&
                (separator || <span className="text-muted-foreground">/</span>)}
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
