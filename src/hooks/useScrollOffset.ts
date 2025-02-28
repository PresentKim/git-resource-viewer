import {useState, useEffect} from 'react'

function useScrollOffset(targetRef: React.RefObject<HTMLElement | null>) {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (targetRef.current) {
        const {top} = targetRef.current.getBoundingClientRect()
        setScrollTop(Math.max(0, -top))
      }
    }
    window.addEventListener('scroll', handleWindowScroll)

    handleWindowScroll()
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [targetRef])

  return scrollTop
}

export {useScrollOffset}
