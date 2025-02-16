import {create} from 'zustand'
import {compactedStorage, createSmartStorage} from './storages'

interface GithubApiTokenStore {
  getGithubToken(): Promise<string | null>
  setGithubToken(githubToken: string): Promise<void>
  clearGithubToken(): Promise<void>
}

const GITHUB_TOKEN_KEY = 'github-api-token'
export const useGithubApiTokenStore = create<GithubApiTokenStore>(() => ({
  async setGithubToken(githubToken: string) {
    await compactedStorage.setItem(GITHUB_TOKEN_KEY, githubToken)
  },
  async getGithubToken() {
    return (await compactedStorage.getItem(GITHUB_TOKEN_KEY)) ?? null
  },
  async clearGithubToken() {
    await compactedStorage.removeItem(GITHUB_TOKEN_KEY)
  },
}))

const CACHE_EXPIRY = 1000 * 60 * 60 // 1 hour (late-limit reset per hour)
type GithubApiCacheData<T> = [etag: string, value: T, expiredAt: number]
export function useGithubApiCacheStore<T>() {
  const storage = createSmartStorage<GithubApiCacheData<T>>()
  return create(() => ({
    ...storage,
    setCache: (key: string, etag: string, value: T) =>
      storage.setItem(key, [etag, value, Date.now() + CACHE_EXPIRY]),
  }))()
}

interface GithubRateLimitState {
  limit: number
  remaining: number
  setRateLimit(limit: number, remaining: number): void
}
export const useGithubRateLimitStore = create<GithubRateLimitState>(set => ({
  limit: 0,
  remaining: 0,
  setRateLimit: (newLimit: number, newRemaining: number) =>
    set({limit: newLimit, remaining: newRemaining}),
}))
