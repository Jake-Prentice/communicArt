import { PREFIX } from 'constants/index'
import { useEffect, useState } from 'react'


function useSessionStorage<T>(
    key: string, 
    initialValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {

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

  const clearValue = () => {
    console.log(`clearing ${prefixedKey}`)  
    sessionStorage.removeItem(prefixedKey);
  }

  useEffect(() => {
    if (value !== null && value !== undefined) sessionStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value])

  return [value, setValue, clearValue]
}

export default useSessionStorage;