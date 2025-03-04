import {useState, useEffect} from 'react'

function useItemSize(
  targetRef: React.RefObject<HTMLElement | null>,
  columnCount: number,
  gap: number,
) {
  const [itemSize, setItemSize] = useState(0)

  // Calculate item size using ResizeObserver
  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const observer = new ResizeObserver(entries => {
      const {width} = entries[0].contentRect
      const itemWidth = (width - gap * (columnCount - 1)) / columnCount
      setItemSize(itemWidth)
    })

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [targetRef, columnCount, gap])

  return itemSize
}

export {useItemSize}
