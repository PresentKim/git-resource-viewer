import {useCallback} from 'react'
import {
  type GithubApiCacheData,
  useGithubApiCacheStore,
  useGithubApiTokenStore,
  useGithubRateLimitStore,
} from '@/stores/githubApiStore'

function useGithubApi<T>() {
  const setRateLimit = useGithubRateLimitStore(state => state.setRateLimit)
  const getGithubToken = useGithubApiTokenStore(state => state.getGithubToken)
  const cacheStore = useGithubApiCacheStore()

  const fetchGithubApi = useCallback(
    async (
      url: string,
      cacheKey: string,
      dataMapper: (response: unknown) => T,
    ) => {
      const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
      }

      const githubToken = await getGithubToken()
      if (githubToken) {
        headers['Authorization'] = `Bearer ${githubToken}`
      }

      let cache: GithubApiCacheData<T> | null = null
      if (cacheKey) {
        cache = (await cacheStore.get(cacheKey)) as GithubApiCacheData<T> | null
        if (cache) {
          if (cache.expiredAt > Date.now()) {
            return cache.value
          } else {
            cacheStore.remove(cacheKey)
            headers['If-None-Match'] = cache.etag
          }
        }
      }

      const response = await fetch(url, {headers})
      setRateLimit(
        parseInt(response.headers.get('X-Ratelimit-Limit') || '0'),
        parseInt(response.headers.get('X-Ratelimit-Remaining') || '0'),
      )
      if (response.status === 304) {
        return cache ? cache.value : null
      }

      if (response.ok) {
        const data = dataMapper(await response.json())

        if (cacheKey) {
          const etag = response.headers.get('Etag')
          if (etag) {
            cacheStore.set(cacheKey, etag, data)
          }
        }

        return data
      }

      throw new Error(`GitHub API request failed: ${response.status}`)
    },
    [cacheStore, getGithubToken, setRateLimit],
  )

  return fetchGithubApi
}

function useGithubDefaultBranch() {
  const fetchGithubApi = useGithubApi<string>()

  const fetchGithubDefaultBranch = useCallback(
    async (owner: string, repo: string) =>
      fetchGithubApi(
        `https://api.github.com/repos/${owner}/${repo}`,
        `${owner}/${repo}`,
        data => (data as {default_branch: string}).default_branch,
      ),
    [fetchGithubApi],
  )
  return fetchGithubDefaultBranch
}

export {useGithubApi, useGithubDefaultBranch}
