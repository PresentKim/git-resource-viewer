import {useLayoutEffect, useState} from 'react'

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    return window.matchMedia(query).matches
  }
  const [matches, setMatches] = useState<boolean>(getMatches(query))

  useLayoutEffect(() => {
    const handleChange = () => {
      setMatches(getMatches(query))
    }
    handleChange()

    const matchMedia = window.matchMedia(query)
    matchMedia.addEventListener('change', handleChange)
    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
