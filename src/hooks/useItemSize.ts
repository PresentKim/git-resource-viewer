import {useState, useEffect} from 'react'
import {observerResize} from '@/utils'

function useItemSize(
  targetRef: React.RefObject<HTMLElement | null>,
  columnCount: number,
  gap: number,
) {
  const [itemSize, setItemSize] = useState(0)

  // Calculate item size using ResizeObserver
  useEffect(() => {
    return observerResize(targetRef.current, entry => {
      const {width} = entry.contentRect
      const itemWidth = (width - gap * (columnCount - 1)) / columnCount
      setItemSize(itemWidth)
    })
  }, [targetRef, columnCount, gap])

  return itemSize
}

export {useItemSize}
