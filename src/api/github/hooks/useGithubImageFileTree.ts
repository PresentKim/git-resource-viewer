import type {GithubImageFileTree, ImageFileTreeRequest} from '../types'
import {useGithubWorker} from './useGithubBaseWorker'

export function useGithubImageFileTree() {
  return useGithubWorker<ImageFileTreeRequest, GithubImageFileTree>(
    String(new URL('../workers/imageFileTreeWorker.ts', import.meta.url)),
  )
}
