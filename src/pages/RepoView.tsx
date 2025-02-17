import {useTargetRepository} from '@/hooks/useTargetRepository'
import {useGithubDefaultBranch} from '@/hooks/useGithubApi'

export default function RepoView() {
  const [{owner, repo, ref}, setTargetRepository] = useTargetRepository()
  const fetchGithubDefaultBranch = useGithubDefaultBranch()

  if (owner && repo && !ref) {
    fetchGithubDefaultBranch(owner, repo)
      .then(defaultBranch => setTargetRepository(owner, repo, defaultBranch))
      .catch(console.error)
  }

  return (
    <main className="flex flex-wrap flex-1 justify-center items-center align-middle min-h-8 w-full px-4 py-2">
      <div className="break-all">
        {owner}
        <hr />
        {repo}
        <hr />
        {ref}
      </div>
    </main>
  )
}
