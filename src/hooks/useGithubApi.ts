import {
  useGithubApiCacheStore,
  useGithubApiTokenStore,
  useGithubRateLimitStore,
} from '@/stores/githubApiStore'

function useGithubApi<T>() {
  const rateLimitStore = useGithubRateLimitStore()
  const tokenStore = useGithubApiTokenStore()
  const cacheStore = useGithubApiCacheStore<T>()

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
      headers['Authorization'] = `Bearer ${githubToken}`
    }

    let cacheValue: T | null = null
    if (cacheKey) {
      const cache = await cacheStore.getItem(cacheKey)
      if (cache) {
        const [etag, value, expiredAt] = cache
        if (expiredAt < Date.now()) {
          await cacheStore.removeItem(cacheKey)
          return value
        } else {
          headers['If-None-Match'] = etag
          cacheValue = value
        }
      }
    }

    const response = await fetch(url, {headers})
    rateLimitStore.setRateLimit(
      parseInt(response.headers.get('X-Ratelimit-Limit') || '0'),
      parseInt(response.headers.get('X-Ratelimit-Remaining') || '0'),
    )
    if (response.status === 304 && cacheValue) {
      return cacheValue
    }

    if (response.ok) {
      const data = dataMapper(await response.json())

      if (cacheKey) {
        const etag = response.headers.get('Etag')
        if (etag) {
          cacheStore.setCache(cacheKey, etag, data)
        }
      }

      return data
    }

    throw new Error(`GitHub API request failed: ${response.status}`)
  }

  return {fetchGithubApi}
}

function useGithubDefaultBranch() {
  const {fetchGithubApi} = useGithubApi<string>()

  return (owner: string, repo: string) =>
    fetchGithubApi(
      `https://api.github.com/repos/${owner}/${repo}`,
      `${owner}/${repo}`,
      data => (data as {default_branch: string}).default_branch,
    )
}

export {useGithubApi, useGithubDefaultBranch}
