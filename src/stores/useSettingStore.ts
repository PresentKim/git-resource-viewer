import {create} from 'zustand'

interface SettingState {
  getFilter: () => string
  setFilter: (filter: string) => void
}

function adjustSearchQueryParam(
  search: string,
  name: string,
  value: string,
  defaultValue: string = '',
) {
  const searchParams = new URLSearchParams(search)
  if (value !== defaultValue) {
    searchParams.set(name, value)
  } else {
    searchParams.delete(name)
  }

  const searchParamsString = searchParams.toString()
  return searchParamsString ? '?' + searchParamsString : ''
}

function createSearchParamGetter(name: string) {
  return () => {
    const search = window.location.hash.startsWith('#/')
      ? window.location.hash.split('?')[1]
      : window.location.search
    return new URLSearchParams(search).get(name) || ''
  }
}

function creatSearchParamSetter(name: string, defaultValue: string = '') {
  return (value: string) => {
    if (window.location.hash.startsWith('#/')) {
      const [hash, search] = window.location.hash.split('?')
      window.location.hash =
        hash + adjustSearchQueryParam(search, name, value, defaultValue)
    } else {
      const path = window.location.pathname
      const search = window.location.search
      window.history.pushState(
        {},
        '',
        path + adjustSearchQueryParam(search, name, value, defaultValue),
      )
    }
  }
}

const FILTER_NAME = 'q'
/**
 * Store for managing the setting state.
 *
 * The filter state is stored in the URL query string.
 * It supports both hash router and browser router
 */
export const useSettingStore = create<SettingState>(() => ({
  getFilter: createSearchParamGetter(FILTER_NAME),
  setFilter: creatSearchParamSetter(FILTER_NAME),
}))
