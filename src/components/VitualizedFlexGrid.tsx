import {useRef} from 'react'
import {useVisibleHeight} from '@/hooks/useVisibleHeight'
import {useScrollOffset} from '@/hooks/useScrollOffset'
import {useVirtualGrid} from '@/hooks/useVirtualGrid'
import {cn} from '@/utils'

type RenderData<T> = {index: number; item: T}

interface VirtualizedFlexGridProps<T> {
  items: T[]
  render: (data: RenderData<T>) => React.ReactNode
  itemWidth: number
  itemHeight: number
  gap?: number
  className?: string
  overscan?: number // Additional rows to render beyond the visible area
}

function VirtualizedFlexGrid<T>({
  items,
  render,
  itemWidth,
  itemHeight,
  gap = 10,
  className,
  overscan = 0,
}: VirtualizedFlexGridProps<T>): React.ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const visibleHeight = useVisibleHeight(wrapperRef)
  const scrollTop = useScrollOffset(wrapperRef)

  const {totalHeight, offsetTop, visibleItems} = useVirtualGrid(
    containerRef,
    items,
    visibleHeight,
    scrollTop,
    itemHeight,
    gap,
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
        {visibleItems.map(({item, originalIndex}) => (
          <div
            key={originalIndex}
            style={{
              width: itemWidth,
              height: itemHeight,
            }}>
            {render({index: originalIndex, item})}
          </div>
        ))}
      </div>
    </div>
  )
}

export type {RenderData}
export {VirtualizedFlexGrid}
