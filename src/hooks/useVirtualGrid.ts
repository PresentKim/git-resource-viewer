import {useMemo} from 'react'

interface VirtualGridResult<T> {
  columnCount: number
  totalHeight: number
  offsetTop: number
  visibleItems: {item: T; originalIndex: number}[]
}

function getRenderedItemsPerRow(
  containerRef: React.RefObject<HTMLElement | null>,
): number {
  if (!containerRef?.current?.children?.length) return 0

  const items = Array.from(containerRef.current.children) as HTMLElement[]
  const firstItemTop = items[0].offsetTop
  let count = 0
  for (const item of items) {
    if (item.offsetTop !== firstItemTop) break
    count++
  }

  return count
}

function useVirtualGrid<T>(
  containerRef: React.RefObject<HTMLElement | null>,
  items: T[],
  visibleHeight: number,
  scrollTop: number,
  itemHeight: number,
  gap: number,
  overscan: number,
): VirtualGridResult<T> {
  // Calculate number of columns based on container width and item width + gap
  const columnCount = Math.max(1, getRenderedItemsPerRow(containerRef))
  const totalItems = items.length
  const rowCount = Math.ceil(totalItems / columnCount)
  const totalHeight = rowCount * (itemHeight + gap) - gap

  // Determine which row is first visible based on scrollTop
  const visibleStartRow = Math.floor(scrollTop / (itemHeight + gap))
  // Calculate number of visible rows (adding 1 for partially visible row)
  const visibleRowCount = Math.ceil(visibleHeight / (itemHeight + gap)) + 1

  // Apply overscan to extend the render range
  const renderStartRow = Math.max(0, visibleStartRow - overscan)
  const renderEndRow = Math.min(
    rowCount,
    visibleStartRow + visibleRowCount + overscan,
  )
  const offsetTop = renderStartRow * (itemHeight + gap)

  // Compute the actual items to render based on calculated rows
  const visibleItems = useMemo(() => {
    const startIndex = renderStartRow * columnCount
    const endIndex = Math.min(totalItems, renderEndRow * columnCount)
    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      originalIndex: startIndex + index,
    }))
  }, [items, renderStartRow, renderEndRow, columnCount, totalItems])

  return {columnCount, totalHeight, offsetTop, visibleItems}
}

export {useVirtualGrid}
