import {create} from 'zustand'

interface SettingState {
  filter: string
  setFilter: (filter: string) => void
}
type SettingName = Exclude<keyof SettingState, `set${string}`>

function getSearchParam<K extends SettingName>(
  name: K,
  defaultValue: SettingState[K],
) {
  const search = window.location.hash.startsWith('#/')
    ? window.location.hash.split('?')[1]
    : window.location.search
  return new URLSearchParams(search).get(name) || defaultValue
}

function creatSearchParamSetter<K extends SettingName>(
  set: (
    partial:
      | SettingState
      | Partial<SettingState>
      | ((state: SettingState) => SettingState | Partial<SettingState>),
    replace?: false,
  ) => void,
  name: K,
  defaultValue: SettingState[K],
) {
  return (value: SettingState[K]) => {
    const isHashRouter = window.location.hash.startsWith('#/')
    const path = isHashRouter
      ? window.location.pathname + window.location.hash.split('?')[0]
      : window.location.pathname
    const search = isHashRouter
      ? window.location.hash.split('?')[1] || ''
      : window.location.search

    // Convert value to string for URL parameters
    const searchParams = new URLSearchParams(search)
    if (value !== defaultValue) {
      searchParams.set(name, value)
    } else {
      searchParams.delete(name)
    }
    const searchParamsString = searchParams.toString()

    const newSearch = searchParamsString ? '?' + searchParamsString : ''
    window.history.replaceState({}, '', path + newSearch)

    // Update the state with the proper typed value
    set({[name]: value} as Partial<SettingState>)
  }
}

/**
 * Store for managing the setting state.
 *
 * The filter state is stored in the URL query string.
 * It supports both hash router and browser router
 */
export const useSettingStore = create<SettingState>(set => ({
  filter: getSearchParam('filter', ''),
  setFilter: creatSearchParamSetter(set, 'filter', ''),
}))
