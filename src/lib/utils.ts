import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function throttle<T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
) {
  let timeout: NodeJS.Timeout | null = null

  return (...args: T) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        fn(...args)
        timeout = null
      }, delay)
    }
  }
}