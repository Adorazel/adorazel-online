import React, {useContext} from "react"
import {Link} from "react-router-dom"
import Helmet from "react-helmet"
import AdminContext from "../context/AdminContext"
import Auth from "../components/Auth"
import logo from "../img/logo.svg"

const AdminPage = () => (
  <div className="content-body d-flex flex-column justify-content-center">
    <Helmet>
      <title>Управление сайтом | Adorazel Online</title>
    </Helmet>
    <h1 className="w-100 text-center">
      <Link to="/" className="d-inline-block"><img src={logo} alt="Adorazel ONLINE" width="250" height="auto"/></Link>
    </h1>
    <Auth ADMIN AUTH={useContext(AdminContext)}/>
  </div>
)

export default AdminPage