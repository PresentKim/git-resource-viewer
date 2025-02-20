import {Input} from '@/components/ui/input'
import {useSearchParams} from 'react-router-dom'
import {InputHTMLAttributes, useEffect} from 'react'
import {throttle} from '@/utils'

interface FilterInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  setValue: (value: string) => void
}

export function FilterInput({value, setValue, ...props}: FilterInputProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  // Initialize input value from URL query parameter
  useEffect(() => {
    const filterParam = searchParams.get('filter') || ''
    setValue(filterParam)
  }, [searchParams, setValue])

  // Update URL query parameter with throttled function
  const updateQueryParam = throttle((newValue: string) => {
    const params = new URLSearchParams(searchParams)
    if (newValue) {
      params.set('filter', newValue)
    } else {
      params.delete('filter')
    }
    setSearchParams(params)
  }, 100)

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const newValue = e.target.value
    setValue(newValue)
    updateQueryParam(newValue)
  }

  return (
    <Input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder="Filter..."
      {...props}
    />
  )
}
