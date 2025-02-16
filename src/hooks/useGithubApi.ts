import {
  useGithubApiCacheStore,
  useGithubApiTokenStore,
} from '@/stores/githubApiStore'

function useGithubApi<T>() {
  const tokenStore = useGithubApiTokenStore()
  const cacheStore = useGithubApiCacheStore<T>()()

  const fetchGithubApi = async (
    url: string,
    cacheKey: string,
    dataMapper: (response: unknown) => T,
  ) => {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    }

    const githubToken = await tokenStore.getGithubToken()
    if (githubToken) {
      console.info('[auth] Using GitHub token')
      headers['Authorization'] = `Bearer ${githubToken}`
    }

    const cache = await cacheStore.getItem(cacheKey)
    let cacheValue: T | null = null
    if (cache) {
      const [etag, value] = cache
      console.info('[cache-hit] ' + cacheKey, cache)
      headers['If-None-Match'] = etag
      cacheValue = value
    } else {
      console.info('[cache-miss] ' + cacheKey)
    }

    const response = await fetch(url, {headers})
    if (response.status === 304 && cacheValue) {
      return cacheValue
    }

    if (response.ok) {
      const etag = response.headers.get('etag')
      const data = dataMapper(await response.json())

      if (etag) {
        cacheStore.setCache(cacheKey, etag, data)
      }

      return data
    }

    throw new Error(`GitHub API request failed: ${response.status}`)
  }

  return {fetchGithubApi}
}

export {useGithubApi}
