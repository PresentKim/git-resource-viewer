import {Fragment, type ComponentProps, type FC} from 'react'

interface BreadcrumbProps {
  items: (string | null)[]
  className?: React.HTMLAttributes<HTMLSpanElement>['className']
  separatorClassName?: string
  ellipsisLength?: number
  separator?: React.ReactNode | null
}

function BreadcrumbList({
  items,
  className,
  ellipsisLength,
  separator,
}: ComponentProps<FC<BreadcrumbProps>>) {
  return (
    <div className="flex flex-wrap gap-x-0.5">
      {items.map(
        (item, index) =>
          item && (
            <Fragment key={index}>
              {index > 0 && (separator || <span>/</span>)}
              <span key={index} className={className}>
                {ellipsisLength && item.length > ellipsisLength
                  ? item.slice(0, ellipsisLength - 2) + '...'
                  : item}
              </span>
            </Fragment>
          ),
      )}
    </div>
  )
}

export {BreadcrumbList}
