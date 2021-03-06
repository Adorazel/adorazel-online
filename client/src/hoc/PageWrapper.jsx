import React, {useContext, useEffect, useRef} from "react"
import {useLocation, useHistory} from "react-router-dom"
import ym from 'react-yandex-metrika'
import ReactGA from "react-ga"
import SimpleBar from "simplebar-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import UserContext from "../context/UserContext"
import AdminContext from "../context/AdminContext"
import SettingsContext from "../context/SettingsContext"


const PageWrapper = ({excludedPaths, children}) => {

  const {global_metrika} = useContext(SettingsContext)

  const {pathname} = useLocation()
  const user = useContext(UserContext)
  const admin = useContext(AdminContext)
  const scroller = useRef()
  const history = useHistory()

  useEffect(() => {
    if (scroller && scroller.current) {
      scroller.current.getScrollElement().scrollTop = 0
    }
  })

  const isAdmin = pathname.match(excludedPaths)

  const uri = history.location.pathname + history.location.search
  const ga = window.ga
  useEffect(() => {
    if (global_metrika && !isAdmin) ym("hit", uri)
    if (ga && !isAdmin) ReactGA.pageview(uri)
  }, [uri, isAdmin, ga, global_metrika])

  return (<>
    {!user.isReady && !admin.isReady
      ? <Loader className="vh-100"/>
      : <SimpleBar ref={scroller} id="root-simplebar" className="vh-100" style={{overflowX: "hidden"}}>
        {!isAdmin && <Header/>}
        {children}
        {!isAdmin && <Footer/>}
      </SimpleBar>
    }
  </>)
}

export default PageWrapper