import {useMemo} from 'react'

interface VirtualGridResult<T> {
  columnCount: number
  totalHeight: number
  offsetTop: number
  visibleItems: {item: T; originalIndex: number}[]
}

function useVirtualGrid<T>(
  items: T[],
  gridWidth: number,
  visibleHeight: number,
  scrollTop: number,
  itemWidth: number,
  itemHeight: number,
  gap: number,
  overscan: number,
): VirtualGridResult<T> {
  // Calculate number of columns based on container width and item width + gap
  const columnCount = Math.max(1, Math.floor(gridWidth / (itemWidth + gap)))
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
