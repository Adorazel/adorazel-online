import React, {useContext, useEffect} from "react"
import {Link, useLocation} from "react-router-dom"
import List from "./List"
import Item from "./Item"
import AdminContext from "../../context/AdminContext"
import useHttp from "../../hooks/http.hook"
import useMessage from "../../hooks/message.hook"


const Panel = ({CONFIG, LEXICON}) => {

  const ACTIONS = ["create", "edit"]

  const lexicon = key => LEXICON.hasOwnProperty(key) ? LEXICON[key] : key

  const {logout} = useContext(AdminContext)
  const location = useLocation()
  const {error, clearError} = useHttp()
  const {alert} = useMessage()

  let config = {}

  const [, _panel, _section, _tab, _action] = location.pathname.toLowerCase().split("/")
  const _params = {}
  if (location.search) {
    location.search.slice(1).toLowerCase().split("&").forEach(p => {
      _params[p.split("=")[0]] = p.split("=")[1]
    })
  }

  Object.keys(CONFIG).includes(_panel)
    ? config.panel = _panel
    : config.panel = Object.keys(CONFIG)[0]

  Object.keys(CONFIG[config.panel]).includes(_section)
    ? config.section = _section
    : config.section = Object.keys(CONFIG[config.panel])[0]

  Object.keys(CONFIG[config.panel][config.section]).includes(_tab)
    ? config.tab = _tab
    : config.tab = Object.keys(CONFIG[config.panel][config.section])[0]

  ACTIONS.includes(_action)
    ? config.action = _action
    : config.action = null

  config.params = _params

  const {panel, section, tab, action} = config

  config = {
    ...config,
    fields: CONFIG[panel][section][tab].fields,
    galleryConfig: CONFIG[panel][section][tab].gallery,
    lexicon
  }

  useEffect(() => {
    if (error && error.status === 401) {
      if (error.message) alert({text: error.message, type: "error"})
      clearError()
      logout()
    }
  }, [error, alert, logout, clearError])

  return <div className="row">
    <div className="col-2 pt-4">
      <div className="nav flex-column nav-pills ">
        {Object.keys(CONFIG[panel]).map(section => {
          return <Link key={section} to={`/${panel}/${section}`}
                       className={`text-uppercase nav-link${section === config.section ? " active" : ""}`}>
            {lexicon(section)}
          </Link>
        })}
      </div>
    </div>
    <div className="col-10">
      <div className="stroke-title">
        <h1 className="title h2 font-weight-bold m-0">{lexicon(panel)}</h1>
      </div>
      <ul className="nav nav-tabs">
        {Object.keys(CONFIG[panel][section]).map(tab => {
          return <li key={tab} className="nav-item">
            <Link to={`/${panel}/${section}/${tab}`}
                  className={`text-uppercase nav-link${tab === config.tab ? " active" : ""}`}>
              {lexicon(tab)}
            </Link>
          </li>
        })}
      </ul>
      {action ? <Item {...config}/> : <List {...config}/>}
    </div>
  </div>
}

export default Panel