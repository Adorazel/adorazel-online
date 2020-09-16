import React, {useContext} from "react"
import UserContext from "../context/UserContext"
import Auth from "../components/Auth"
import SEO from "../components/SEO";

const LoginPage = () => (
  <div className="content-body d-flex align-items-center">
    <SEO
      title="Вход в Личный кабинет"
      robots="none"
    />
    <Auth AUTH={useContext(UserContext)}/>
  </div>
)

export default LoginPage