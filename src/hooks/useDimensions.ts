import {useState, useEffect} from 'react'

function useDimensions(targetRef: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0)
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

  // Update grid width using getBoundingClientRect
  useEffect(() => {
    const updateWidth = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect()
        setWidth(rect.width)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [targetRef])

  return {width, visibleHeight}
}

export {useDimensions as useContainerDimensions}
