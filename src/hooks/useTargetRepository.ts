import {useParams, useNavigate} from 'react-router-dom'

interface Params extends Record<string, string | undefined> {
  owner: string | undefined
  repo: string | undefined
  '*': string | undefined
}

export interface TargetRepository {
  owner: string | null
  repo: string | null
  ref: string | null
}

export function useTargetRepository(): [
  TargetRepository,
  (newTargetRepository: TargetRepository) => void,
] {
  const params = useParams<Params>() // extracting repoId from params
  const navigate = useNavigate()

  const targetRepository: TargetRepository = {
    owner: params.owner ?? null,
    repo: params.repo ?? null,
    ref: params['*'] ?? null,
  }

  const setTargetRepository = (newTargetRepository: TargetRepository) => {
    navigate(
      `/${newTargetRepository.owner}/${newTargetRepository.repo}/${newTargetRepository.ref}`,
    )
  }

  return [targetRepository, setTargetRepository]
}
