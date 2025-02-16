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

type GithubApiCacheData<T> = [etag: string, value: T]
export function useGithubApiCacheStore<T>() {
  const storage = createSmartStorage<GithubApiCacheData<T>>()
  return create(() => ({
    ...storage,
    getItem: (key: string) => storage.getItem(key),
    setCache: (key: string, etag: string, value: T) =>
      storage.setItem(key, [etag, value]),
  }))
}
