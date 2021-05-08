import { useEffect, useState } from 'react'

export const PREFIX = 'communicArt-'

function useLocalStorage<T>(
    key: string, 
    initialValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {

  const prefixedKey = PREFIX + key
  const [value, setValue] = useState<T>(() => {

    const jsonValue = localStorage.getItem(prefixedKey)

    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === 'function') {
        return initialValue()
    } else {
        return initialValue
    }
  })

  useEffect(() => {
    if (value) localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value, initialValue])

  return [value, setValue]
}

export default useLocalStorage;