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
  const params = useParams<Params>() // extracting repoId from params
  const navigate = useNavigate()

  const targetRepository: TargetRepository = {
    owner: params.owner ?? '',
    repo: params.repo ?? '',
    ref: params['*'] ?? '',
  }

  const setTargetRepository = (
    owner: string,
    repo: string,
    ref: string | null | undefined,
  ) => {
    navigate(`/${owner}/${repo}${ref ? `/${ref}` : ''}`)
  }

  return [targetRepository, setTargetRepository] as const
}
