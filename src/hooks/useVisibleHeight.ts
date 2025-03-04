import {observeIntersection} from '@/utils'
import {useState, useEffect} from 'react'

function useVisibleHeight(targetRef: React.RefObject<HTMLElement | null>) {
  const [visibleHeight, setVisibleHeight] = useState(0)

  // Calculate visible height using IntersectionObserver
  useEffect(() => {
    return observeIntersection(
      targetRef.current,
      entry => {
        setVisibleHeight(entry.intersectionRect.height)
      },
      {
        root: null, // Use viewport as root
        threshold: Array.from({length: 101}, (_, i) => i / 100),
      },
    )
  }, [targetRef])

  return visibleHeight
}

export {useVisibleHeight}
