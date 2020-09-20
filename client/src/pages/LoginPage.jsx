import React, {useContext} from "react"
import UserContext from "../context/UserContext"
import Auth from "../components/Auth"
import {Helmet} from "react-helmet"

const LoginPage = () => (
  <div className="content-body d-flex align-items-center">
    <Helmet>
      <title>Вход в Личный кабинет | Adorazel Online</title>
    </Helmet>
    <Auth AUTH={useContext(UserContext)}/>
  </div>
)

export default LoginPage