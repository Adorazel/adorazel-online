import React, {useContext} from "react"
import {NavLink} from "react-router-dom"
import NavContext from "../../context/NavContext"

const Footer = () => {
  const nav = useContext(NavContext)
  return (
    <footer className="footer text-uppercase">
      <div className="container">
        <div className="d-flex justify-content-start justify-content-md-between align-items-center flex-wrap flex-md-nowrap">
          <ul className="d-flex flex-wrap flex-md-nowrap list-unstyled mb-0">
            {nav.map(({id, title, uri}) => <li key={id} className="mb-2 mb-md-0"><NavLink to={uri}>{title}</NavLink></li>)}
          </ul>
          <div className="footer__copyright">
            <span>&copy;</span> {new Date().getFullYear()} Adorazel &#128572; All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer