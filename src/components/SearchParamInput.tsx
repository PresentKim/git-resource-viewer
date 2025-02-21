import {Input} from '@/components/ui/input'
import {useSearchParams} from 'react-router-dom'
import {InputHTMLAttributes, useEffect} from 'react'
import {throttle} from '@/utils'

interface SearchParamInput extends InputHTMLAttributes<HTMLInputElement> {
  param: string
  value: string
  setValue: (value: string) => void
}

export function SearchParamInput({
  param,
  value,
  setValue,
  ...props
}: SearchParamInput) {
  const [searchParams, setSearchParams] = useSearchParams()

  // Initialize input value from URL query parameter
  useEffect(() => {
    const filterParam = searchParams.get(param) || ''
    setValue(filterParam)
  }, [searchParams, setValue, param])

  // Update URL query parameter with throttled function
  const updateQueryParam = throttle((newValue: string) => {
    const params = new URLSearchParams(searchParams)
    if (newValue) {
      params.set(param, newValue)
    } else {
      params.delete(param)
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
