import {useEffect} from 'react'
import {useTargetRepository} from '@/hooks/useTargetRepository'
import {useGithubDefaultBranch} from '@/hooks/useGithubApi'

export default function RepoView() {
  const [{owner, repo, ref}, setTargetRepository] = useTargetRepository()
  const fetchGithubDefaultBranch = useGithubDefaultBranch()

  useEffect(() => {
    if (owner && repo && !ref) {
      fetchGithubDefaultBranch(owner, repo)
        .then(defaultBranch => setTargetRepository(owner, repo, defaultBranch))
        .catch(console.error)
    }
  }, [owner, repo, ref, fetchGithubDefaultBranch, setTargetRepository])

  return (
    <>
      <div className="break-all">
        {owner}
        <hr />
        {repo}
        <hr />
        {ref}
      </div>
    </>
  )
}
