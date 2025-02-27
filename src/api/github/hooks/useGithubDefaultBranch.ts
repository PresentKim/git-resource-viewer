import type {DefaultBranchRequest, GithubDefaultBranch} from '../types'
import {useGithubWorker} from './useGithubBaseWorker'

export function useGithubDefaultBranch() {
  return useGithubWorker<DefaultBranchRequest, GithubDefaultBranch>(
    String(new URL('../workers/defaultBranchWorker.ts', import.meta.url)),
  )
}
