import {useEffect, useState, useRef} from 'react'
import {cn, throttle} from '@/utils'

export function FloatingHeader({
  className,
  ...props
}: Omit<React.ComponentProps<'header'>, 'ref'>) {
  const [isVisible, setIsVisible] = useState(true)
  const [heightHeight, setHeaderHeight] = useState(40)
  const scrollYRef = useRef(window.scrollY)

  const resizeObserverRef = useRef(
    new ResizeObserver(
      throttle(entries => {
        for (const entry of entries) {
          setHeaderHeight(entry.contentRect.height)
        }
      }, 100),
    ),
  )

  const targetRef = useRef((node: HTMLElement | null) => {
    if (node) {
      setHeaderHeight(node.clientHeight)
      resizeObserverRef.current.observe(node)
      return () => resizeObserverRef.current.unobserve(node)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(
        window.scrollY < scrollYRef.current || window.scrollY < heightHeight,
      )
      scrollYRef.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setIsVisible, heightHeight])

  return (
    <>
      <div style={{minHeight: heightHeight}} />
      <header
        ref={targetRef.current}
        className={cn(
          'fixed top-0 left-0 z-50 transition-all',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          className,
        )}
        {...props}
      />
    </>
  )
}
