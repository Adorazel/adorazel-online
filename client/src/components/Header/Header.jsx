import React, {useContext, useState} from "react"
import {Link, NavLink} from "react-router-dom"
import {Tooltip} from "react-tippy"
import NavContext from "../../context/NavContext"
import useClipboard from "../../hooks/clipboard.hook"
import logo from "../../img/logo.svg"

const Header = () => {

  const nav = useContext(NavContext)
  const [mobileIsOpen, setMobileIsOpen] = useState(false)

  const mobileMenuHandler = () => setMobileIsOpen(!mobileIsOpen)

  return (
    <header className="header">
      <div className="aurora"/>
      <div className="container">
        <div className="d-flex mx-n2">
          <div className="header__logo flex-grow-0 px-2">
            <Link to="/" className="d-inline-block"><img src={logo} alt="Adorazel ONLINE" width="210"
                                                         height="auto"/></Link>
          </div>
          <div className="header__body flex-grow-1 px-2">
            <div className="header__contact d-flex align-items-center justify-content-end">
              <ul className="d-flex justify-content-end list-unstyled mb-0">
                <Tooltip tag="li" position="bottom" title="Skype">
                  <button type="button" className="btn btn-link"
                          onClick={useClipboard.bind(this, {text: "live:adorazel"})}>
                    <i className="icon-skype"/>
                  </button>
                </Tooltip>
                <Tooltip tag="li" position="bottom" title="Telegram">
                  <button type="button" className="btn btn-link"
                          onClick={useClipboard.bind(this, {text: "@adorazel"})}>
                    <i className="icon-telegram"/>
                  </button>
                </Tooltip>
                <Tooltip tag="li" position="bottom" title="ICQ">
                  <button type="button" className="btn btn-link"
                          onClick={useClipboard.bind(this, {text: "445641430"})}>
                    <i className="icon-icq"/>
                  </button>
                </Tooltip>
                <Tooltip tag="li" position="bottom" title="Email">
                  <button type="button" className="btn btn-link"
                          onClick={useClipboard.bind(this, {text: "info@adorazel.online"})}>
                    <i className="icon-mail"/>
                  </button>
                </Tooltip>
              </ul>
            </div>
            <div className="header__menu">
              <nav className="d-none d-lg-flex justify-content-end align-items-center">
                <ul className="nav-wrapper d-flex list-unstyled mb-0">
                  {nav.map(({id, title, uri}) => (
                    <li key={id}>
                      <NavLink exact={uri === "/"} to={uri} data-title={title} className="menu-link">
                        <span>{title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="nav-wrapper d-flex d-lg-none justify-content-end align-items-center">
                <button type="button" className="btn btn-sm btn-primary text-uppercase" onClick={mobileMenuHandler}>
                  <i className="icon-menu nav-wrapper__nav-btn-icon"/>
                  <span className="nav-wrapper__nav-btn-text">Навигация</span>
                </button>
                <div className={`header__menu__mobile-trigger${mobileIsOpen ? " open" : ""}`}
                     onClick={mobileMenuHandler}/>
                <nav className={`header__menu__mobile${mobileIsOpen ? " open" : ""}`}>
                  <button type="button" className="btn btn-sm close mr-3 mt-2 pt-1 text-white"
                          onClick={mobileMenuHandler}>&times;</button>
                  <ul className="list-unstyled mb-0 mt-5">
                    {nav.map(({id, title, uri}) => (
                      <li key={id}>
                        <NavLink exact={uri === "/"} to={uri} data-title={title} className="menu-link"
                                 onClick={mobileMenuHandler}>
                          <span>{title}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

