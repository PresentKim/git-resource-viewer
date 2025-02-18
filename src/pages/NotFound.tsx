import {useCallback, useMemo, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {cn} from '@/lib/utils'
import {generateNotFoundMessage} from '@/lib/randomMessages'

export default function NotFound() {
  const navigate = useNavigate()
  const {'*': pagePath} = useParams<{'*': string}>()

  const [isRedirecting, setIsRedirecting] = useState(false)
  const randomMessage = useMemo(generateNotFoundMessage, [])

  const handleGoBack = useCallback(() => {
    setIsRedirecting(true)
    setTimeout(() => navigate('/'), 500)
  }, [navigate])

  return (
    <main
      className={cn(
        'flex flex-col items-center justify-center h-full space-y-8 p-4',
        'transition-opacity duration-500',
        isRedirecting ? 'opacity-0' : 'opacity-100',
      )}>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-4xl font-semibold mb-6">{randomMessage.title}</h2>
      <p className="text-gray-400 text-lg mb-8">
        Looks like <u>{pagePath}</u> {randomMessage.description}
      </p>
      <p className="text-gray-400 text-lg italic">{randomMessage.footer}</p>
      <button
        onClick={handleGoBack}
        className={cn(
          'w-full sm:w-auto px-6 py-3',
          'bg-neutral-700 text-white font-semibold rounded-lg shadow-md',
          'hover:bg-neutral-800 hover:shadow-lg transition-colors',
        )}>
        Go Back Home
      </button>
    </main>
  )
}
