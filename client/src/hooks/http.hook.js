import {useCallback, useState} from "react"

const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true)
    try {
      if (body && headers["Content-Type"] === "application/json") body = JSON.stringify(body)
      const response = await fetch(url, {method, body, headers})
      const data = await response.json()
      if (response.ok) {
        setLoading(false)
        return data
      }
      const error = new Error(data.message || "Что-то пошло не так...")
      error.status = response.status
      error.data = data.errors
      throw error
    } catch (e) {
      setError(e)
      setLoading(false)
    }
  }, [])
  const clearError = useCallback(() => setError(null), [])
  return {loading, request, error, clearError}
}

export default useHttp
