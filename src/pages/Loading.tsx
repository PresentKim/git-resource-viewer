import {LoaderIcon} from 'lucide-react'

export default function Loading() {
  return (
    <main className="flex items-center justify-center h-full">
      <LoaderIcon className="size-16 animate-spin" />
    </main>
  )
}
