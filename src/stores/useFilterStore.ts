import {create} from 'zustand'

function updateSearchParams(search: string, name: string, value: string) {
  const searchParams = new URLSearchParams(search)
  if (value) {
    searchParams.set(name, value)
  } else {
    searchParams.delete(name)
  }

  const searchParamsString = searchParams.toString()
  return searchParamsString ? '?' + searchParamsString : ''
}

interface FilterState {
  getFilter: () => string
  setFilter: (filter: string) => void
}

const FILTER = 'q'
/**
 * Store for managing the filter state.
 *
 * The filter state is stored in the URL query string.
 * It supports both hash router and browser router
 */
export const useFilterStore = create<FilterState>(() => ({
  getFilter: () => {
    const search = window.location.hash.startsWith('#/')
      ? window.location.hash.split('?')[1]
      : window.location.search
    return new URLSearchParams(search).get(FILTER) || ''
  },
  setFilter: (value: string) => {
    if (window.location.hash.startsWith('#/')) {
      const [hash, search] = window.location.hash.split('?')
      window.location.hash = hash + updateSearchParams(search, FILTER, value)
    } else {
      const path = window.location.pathname
      const search = window.location.search
      window.history.pushState(
        {},
        '',
        path + updateSearchParams(search, FILTER, value),
      )
    }
  },
}))
