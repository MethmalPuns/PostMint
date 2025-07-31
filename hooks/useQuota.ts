// hooks/useQuota.ts (example)
import { useEffect, useState } from 'react'

export const useQuota = () => {
  const [quota, setQuota] = useState({ inputsLeft: 1, postsLeft: 5 })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('postmintQuota') || '{"inputsLeft":1,"postsLeft":5}')
    setQuota(saved)
  }, [])

  const updateQuota = (inputs: number, posts: number) => {
    const newQuota = { inputsLeft: inputs, postsLeft: posts }
    setQuota(newQuota)
    localStorage.setItem('postmintQuota', JSON.stringify(newQuota))
  }

  return { quota, updateQuota }
}
