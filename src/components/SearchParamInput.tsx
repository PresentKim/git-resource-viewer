import {useCallback, useEffect, useMemo} from 'react'
import {Input} from '@/components/ui/input'
import {useSearchParams} from 'react-router-dom'
import {debounce} from '@/utils'

interface SearchParamInput extends React.InputHTMLAttributes<HTMLInputElement> {
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

  // Update URL query parameter with debounced function
  const updateQueryParam = useMemo(
    () =>
      debounce((newValue: string) => {
        const params = new URLSearchParams(searchParams)
        if (newValue) {
          params.set(param, newValue)
        } else {
          params.delete(param)
        }
        setSearchParams(params)
      }, 500),
    [searchParams, param, setSearchParams],
  )

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      e => {
        const newValue = e.target.value
        setValue(newValue)
        updateQueryParam(newValue)
      },
      [setValue, updateQueryParam],
    )

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
