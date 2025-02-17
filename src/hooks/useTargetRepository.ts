import {useCallback, useMemo} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

interface Params extends Record<string, string | undefined> {
  owner: string | undefined
  repo: string | undefined
  '*': string | undefined
}

export interface TargetRepository {
  owner: string
  repo: string
  ref: string
}

export function useTargetRepository() {
  const {owner, repo, '*': ref} = useParams<Params>()
  const navigate = useNavigate()

  const targetRepository: TargetRepository = useMemo(
    () => ({
      owner: owner ?? '',
      repo: repo ?? '',
      ref: ref ?? '',
    }),
    [owner, repo, ref],
  )

  const setTargetRepository = useCallback(
    (owner: string, repo: string, ref: string | null | undefined) => {
      navigate(`/${owner}/${repo}${ref ? `/${ref}` : ''}`)
    },
    [navigate],
  )

  return [targetRepository, setTargetRepository] as const
}
