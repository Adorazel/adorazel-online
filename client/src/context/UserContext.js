import {createContext} from "react"

function noop() {}

 const UserContext = createContext({
  token: null,
  id: null,
  login: noop,
  logout: noop,
  isLogin: false,
  isReady: false,
})

export default UserContext