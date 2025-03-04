import {useEffect, useState} from 'react'
import {
  renderQueryString,
  unstable_createAdapterProvider as createAdapterProvider,
} from 'nuqs/adapters/custom'

export const NuqsHashAdapter = createAdapterProvider(function () {
  const getSearchParams = () => window.location.hash.split('?')[1] || ''

  const [searchParams, setSearchParams] = useState(() => {
    if (typeof window.location === 'undefined') {
      return new URLSearchParams()
    }
    return new URLSearchParams(getSearchParams())
  })

  useEffect(() => {
    const updateSearchParams = () => {
      setSearchParams(new URLSearchParams(getSearchParams()))
    }

    window.addEventListener('hashchange', updateSearchParams)
    window.addEventListener('popstate', updateSearchParams)
    return () => {
      window.removeEventListener('hashchange', updateSearchParams)
      window.removeEventListener('popstate', updateSearchParams)
    }
  }, [])

  return {
    searchParams,
    updateUrl(search) {
      const {pathname, hash} = window.location
      const baseUrl = pathname + hash.split('?')[0]
      const query = renderQueryString(search)
      window.history.replaceState({}, '', baseUrl + query)
    },
    getSearchParamsSnapshot() {
      return new URLSearchParams(getSearchParams())
    },
  }
})
