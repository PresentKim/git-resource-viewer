import {create} from 'zustand'

interface GithubApiTokenStore {
  githubToken: string | null
  setGithubToken(githubToken: string): void
  clearGithubToken(): void
}

const GITHUB_TOKEN_KEY = 'github-api-token'
export const useGithubApiTokenStore = create<GithubApiTokenStore>(() => ({
  githubToken: localStorage.getItem(GITHUB_TOKEN_KEY),
  setGithubToken: githubToken =>
    localStorage.setItem(GITHUB_TOKEN_KEY, githubToken),
  clearGithubToken: () => localStorage.removeItem(GITHUB_TOKEN_KEY),
}))

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
