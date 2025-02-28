import {useRef} from 'react'
import {useContainerDimensions} from '@/hooks/useDimensions'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const {width: containerWidth, visibleHeight} =
    useContainerDimensions(containerRef)
  const scrollTop = useScrollOffset(containerRef)

  const {totalHeight, offsetTop, visibleItems} = useVirtualGrid(
    items,
    containerWidth,
    visibleHeight,
    scrollTop,
    itemWidth,
    itemHeight,
    gap,
    overscan,
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      style={{
        paddingTop: offsetTop,
        height: totalHeight,
      }}>
      <div
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
