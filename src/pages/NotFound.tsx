import {useCallback, useMemo, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

import {Button} from '@/components/ui/button'
import {cn} from '@/utils'
import {generateNotFoundMessage} from '@/utils/randomMessages'

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
        'opacity-100 transition-opacity duration-500',
        {'opacity-0': isRedirecting},
      )}>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-4xl font-semibold mb-6">{randomMessage.title}</h2>
      <p className="text-muted-foreground text-lg mb-8">
        Looks like <u>{pagePath}</u> {randomMessage.description}
      </p>
      <p className="text-muted-foreground text-lg italic">
        {randomMessage.footer}
      </p>
      <Button onClick={handleGoBack}>Go Back Home</Button>
    </main>
  )
}
