import {useState, useEffect} from 'react'

function useVisibleHeight(targetRef: React.RefObject<HTMLElement | null>) {
  const [visibleHeight, setVisibleHeight] = useState(0)

  // Calculate visible height using IntersectionObserver
  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      entries => setVisibleHeight(entries[0].intersectionRect.height),
      {
        root: null, // Use viewport as root
        threshold: Array.from({length: 101}, (_, i) => i / 100),
      },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [targetRef])

  return visibleHeight
}

export {useVisibleHeight}
