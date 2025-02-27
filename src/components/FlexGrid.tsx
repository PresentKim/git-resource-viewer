import {cn} from '@/utils'
import React from 'react'

interface FlexGridProps extends React.ComponentProps<'div'> {
  columns: number
  gap?: number
  children: React.ReactNode
}

function FlexGrid({
  columns,
  gap = 10,
  children,
  className,
}: FlexGridProps): React.ReactElement {
  return (
    <div
      className={cn('flex flex-wrap justify-start', className)}
      style={{
        gap: `${gap}px`,
      }}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="flex flex-col"
          style={{
            flex: `0 0 calc(100% / ${columns} - ${gap}px)`, // 고정 크기 유지
            maxWidth: `calc(100% / ${columns} - ${gap}px)`, // 요소가 과도하게 커지는 것 방지
          }}>
          {child}
        </div>
      ))}
    </div>
  )
}

export {FlexGrid}
