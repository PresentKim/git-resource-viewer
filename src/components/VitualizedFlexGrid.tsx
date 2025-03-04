import {useRef} from 'react'
import {useVisibleHeight} from '@/hooks/useVisibleHeight'
import {useScrollOffset} from '@/hooks/useScrollOffset'
import {useVirtualGrid} from '@/hooks/useVirtualGrid'
import {cn} from '@/utils'
import {useItemSize} from '@/hooks/useItemSize'

type RenderData<T> = {index: number; item: T}

interface VirtualizedFlexGridProps<T> {
  items: T[]
  render: (data: RenderData<T>) => React.ReactNode
  columnCount: number
  gap?: number
  className?: string
  overscan?: number // Additional rows to render beyond the visible area
}

function VirtualizedFlexGrid<T>({
  items,
  columnCount,
  overscan = 0,
  gap = 10,
  render,
  className,
}: VirtualizedFlexGridProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const visibleHeight = useVisibleHeight(wrapperRef)
  const scrollOffset = useScrollOffset(wrapperRef)
  const itemSize = useItemSize(containerRef, columnCount, gap)

  const {totalHeight, offsetTop, visibleIndexs} = useVirtualGrid(
    items.length,
    columnCount,
    visibleHeight,
    itemSize,
    gap,
    scrollOffset,
    overscan,
  )

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full', className)}
      style={{
        paddingTop: offsetTop,
        height: totalHeight,
      }}>
      <div
        ref={containerRef}
        className="flex flex-wrap items-start"
        style={{
          gap: gap,
        }}>
        {visibleIndexs.map(originalIndex => (
          <div
            key={originalIndex}
            style={{
              flexBasis: `calc(100% / ${columnCount} - ${gap}px)`,
            }}>
            {render({index: originalIndex, item: items[originalIndex]})}
          </div>
        ))}
      </div>
    </div>
  )
}

export type {RenderData}
export {VirtualizedFlexGrid}
