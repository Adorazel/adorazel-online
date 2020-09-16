import React, {useContext, useEffect, useRef} from "react"
import {useLocation} from "react-router-dom"
import SimpleBar from "simplebar-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import UserContext from "../context/UserContext"
import AdminContext from "../context/AdminContext"


const PageWrapper = ({children}) => {

  const {pathname} = useLocation()
  const user = useContext(UserContext)
  const admin = useContext(AdminContext)
  const scroller = useRef()

  useEffect(() => {
    if (scroller && scroller.current) {
      scroller.current.getScrollElement().scrollTop = 0
    }
  })

  return (<>
    {!user.isReady && !admin.isReady
      ? <Loader className="vh-100"/>
      : <SimpleBar ref={scroller} id="root-simplebar" className="vh-100" style={{overflowX: "hidden"}}>
        {!pathname.match(/(admin|dashboard)/ig) && <Header/>}
        {children}
        {!pathname.match(/(admin|dashboard)/ig) && <Footer/>}
      </SimpleBar>
    }
  </>)
}

export default PageWrapper