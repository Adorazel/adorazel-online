import React, {useContext, useRef} from "react"
import SimpleBar from "simplebar-react"
import {CSSTransition} from "react-transition-group"
import SettingsContext from "../../../context/SettingsContext"
import useParser from "../../../hooks/parser.hook"

const Aside = ({mobile, current, open, toggleHandler}) => {

  const {portfolio_text} = useContext(SettingsContext)
  const portfolioTab = useRef()
  const projectTab = useRef()

  const style = {
    overflowX: "hidden",
    maxHeight: !mobile ? "calc(100vh - 300px)" : ""
  }

  return (
    <aside className="portfolio-info flex-grow-0 pattern p-5">
      {!mobile && <ul className="nav nav-tabs position-relative">
        <li className="nav-item w-50 text-center" onClick={event => open && toggleHandler.call(this, null, event)}>
          <a href="#portfolio" className={`bg-transparent nav-link${open ? "" : " active"}`}>Портфолио</a>
        </li>
        <li className="nav-item w-50 text-center" onClick={event => !open && toggleHandler.call(this, null, event)}>
          <a href="#project" className={`bg-transparent nav-link${open ? " active" : ""}`}>{current && current.title}</a>
        </li>
      </ul>}
      <CSSTransition
        nodeRef={portfolioTab}
        in={!open}
        timeout={800}
        classNames="tab"
        mountOnEnter
        unmountOnExit
      >
        <div ref={portfolioTab} className={`tab${!mobile ? " position-absolute" : ""} portfolio-tab py-3 animate__animated animate__fast`}>
          <SimpleBar className="mx-n4 px-4" style={style} autoHide={false}>
            <div className="pt-lg-4">
              {useParser(portfolio_text)}
            </div>
          </SimpleBar>
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={projectTab}
        in={open}
        timeout={800}
        classNames="tab"
        mountOnEnter
        unmountOnExit
      >
        <div ref={projectTab} className={`tab${!mobile ? " position-absolute" : ""} project-tab py-3 animate__animated animate__fast`}>
          <SimpleBar className="mx-n4 px-4" style={style} autoHide={false}>
            {useParser(current && current.richtext)}
          </SimpleBar>
        </div>
      </CSSTransition>
    </aside>
  )
}

export default Aside