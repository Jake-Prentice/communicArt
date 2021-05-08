import { useEffect, useState } from 'react'

export const PREFIX = 'communicArt-'

function useSessionStorage<T>(
    key: string, 
    initialValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {

  const prefixedKey = PREFIX + key
  const [value, setValue] = useState<T>(() => {

    const jsonValue = sessionStorage.getItem(prefixedKey)

    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === 'function') {
        return initialValue()
    } else {
        return initialValue
    }
  })

  useEffect(() => {
    if (value !== null && value !== undefined) sessionStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value])

  return [value, setValue]
}

export default useSessionStorage;