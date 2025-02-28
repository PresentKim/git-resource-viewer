import {useMemo} from 'react'

interface VirtualGridResult<T> {
  columnCount: number
  totalHeight: number
  offsetTop: number
  visibleItems: {item: T; originalIndex: number}[]
}

function useVirtualGrid<T>(
  items: T[],
  visibleHeight: number,
  scrollOffset: number,
  itemHeight: number,
  columnCount: number,
  gap: number,
  overscan: number,
): VirtualGridResult<T> {
  const totalCount = items.length
  const rowCount = Math.ceil(totalCount / columnCount)

  // Determine which row is first visible based on scrollTop
  const visibleStartRow = Math.floor(scrollOffset / (itemHeight + gap))
  const visibleRowCount = Math.ceil(visibleHeight / (itemHeight + gap)) + 1

  // Apply overscan to extend the render range
  const renderStartRow = Math.max(0, visibleStartRow - overscan)
  const renderEndRow = Math.min(
    rowCount,
    visibleStartRow + visibleRowCount + overscan,
  )

  // Compute the actual items to render based on calculated rows
  const visibleItems = useMemo(() => {
    const startIndex = renderStartRow * columnCount
    const endIndex = Math.min(totalCount, renderEndRow * columnCount)
    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      originalIndex: startIndex + index,
    }))
  }, [items, renderStartRow, renderEndRow, columnCount, totalCount])

  return {
    totalHeight: rowCount * (itemHeight + gap) - gap,
    offsetTop: renderStartRow * (itemHeight + gap),
    columnCount,
    visibleItems,
  }
}

export {useVirtualGrid}
