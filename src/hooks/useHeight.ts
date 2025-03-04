import {useState, useEffect} from 'react'

function useHeight(targetRef: React.RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const observer = new ResizeObserver(([target]) =>
      setHeight(target.contentRect.height),
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [targetRef])

  return height
}

export {useHeight}
