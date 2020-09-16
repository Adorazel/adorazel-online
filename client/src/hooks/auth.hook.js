import {useCallback, useEffect, useState} from "react"

const INITIAL_STATE = {
  token: null,
  userId: null,
  isLogin: false,
  isReady: false
}

const useAuth = (STORAGE_NAME) => {

  const [state, setState] = useState(INITIAL_STATE)

  const login = useCallback(({token, userId, expiresIn}) => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify({token, userId, expiresIn}))
    setState({token, userId, isLogin: true, isReady: true})
  }, [STORAGE_NAME])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_NAME)
    setState({...INITIAL_STATE, isReady: true})
  }, [STORAGE_NAME])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME))
    if (data && Date.now() < data.expiresIn) return login(data)
    logout()
  }, [STORAGE_NAME, login, logout])

  return {...state, login, logout}
}

export default useAuth