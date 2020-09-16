import React, {useCallback, useEffect, useState} from "react"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import StorageContext from "./context/StorageContext"
import AdminContext from "./context/AdminContext"
import UserContext from "./context/UserContext"
import NavContext from "./context/NavContext"
import SettingsContext from "./context/SettingsContext"
import {Helmet} from "react-helmet"

import PageWrapper from "./hoc/PageWrapper"
import MainPage from "./pages/MainPage"
import PortfolioPage from "./pages/PortfolioPage"
import ProjectPage from "./pages/ProjectPage"
import AboutPage from "./pages/AboutPage"
import BlogPage from "./pages/BlogPage"
import PostPage from "./pages/PostPage"
import ContactPage from "./pages/ContactPage"
// import LoginPage from "./pages/LoginPage"
// import CabinetPage from "./pages/CabinetPage"
import AdminPage from "./pages/AdminPage"
import DashboardPage from "./pages/DashboardPage"
import NotFountPage from "./pages/NotFoundFage"

import useAuth from "./hooks/auth.hook"
import useStorage from "./hooks/storage.hook"
import useHttp from "./hooks/http.hook"
import {GET_ALL} from "./api"

import {v4 as uuidv4} from "uuid"


const nav = [{
  id: uuidv4(),
  title: "Главная",
  uri: "/"
}, {
  id: uuidv4(),
  title: "Портфолио",
  uri: "/portfolio"
}, {
  id: uuidv4(),
  title: "Обо мне",
  uri: "/about"
}, {
  id: uuidv4(),
  title: "Блог",
  uri: "/blog"
}, {
  id: uuidv4(),
  title: "Контакты",
  uri: "/contact"
}]

function App() {

  const adminLogin = useAuth("adminData")
  const userLogin = useAuth("userData")
  const {createInstance} = useStorage()
  const storage = {
    images: createInstance("images"),
    files: createInstance("files"),
  }

  const [settings, setSettings] = useState(null)
  const {request} = useHttp()

  const getSettings = useCallback(async () => {
    const data = await request(...GET_ALL("settings"))
    const obj = {}
    data && data.forEach(item => {
      obj[item.key] = item.value
    })
    data && setSettings(obj)
  }, [request])

  useEffect(() => {
    if (!settings) getSettings()
  }, [settings, getSettings])

  // TODO Личный кабинет
  // let manage = {
  //   id: uuidv4(),
  //   title: "Вход",
  //   uri: "/login"
  // }
  //
  // if (userLogin.isLogin) {
  //   manage = {
  //     id: uuidv4(),
  //     title: "Личный кабинет",
  //     uri: "/cabinet"
  //   }
  // }

  return (
    <StorageContext.Provider value={{...storage}}>
      <AdminContext.Provider value={{...adminLogin}}>
        <UserContext.Provider value={{...userLogin}}>
          <NavContext.Provider value={[...nav, /*manage*/]}>
            <SettingsContext.Provider value={{...settings}}>
            <Helmet>
              <title>Adorazel Online</title>
              <meta name="title" content="Adorazel Online"/>

              <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
              <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>

              <link rel="apple-touch-icon" sizes="57x57" href="/static/meta/apple-icon-57x57.png"/>
              <link rel="apple-touch-icon" sizes="60x60" href="/static/meta/apple-icon-60x60.png"/>
              <link rel="apple-touch-icon" sizes="72x72" href="/static/meta/apple-icon-72x72.png"/>
              <link rel="apple-touch-icon" sizes="76x76" href="/static/meta/apple-icon-76x76.png"/>
              <link rel="apple-touch-icon" sizes="114x114" href="/static/meta/apple-icon-114x114.png"/>
              <link rel="apple-touch-icon" sizes="120x120" href="/static/meta/apple-icon-120x120.png"/>
              <link rel="apple-touch-icon" sizes="144x144" href="/static/meta/apple-icon-144x144.png"/>
              <link rel="apple-touch-icon" sizes="152x152" href="/static/meta/apple-icon-152x152.png"/>
              <link rel="apple-touch-icon" sizes="180x180" href="/static/meta/apple-icon-180x180.png"/>
              <link rel="manifest" href="/static/meta/manifest.json"/>
              <meta name="msapplication-config" content="/static/meta/browserconfig.xml"/>
              <meta name="theme-color" content="#1b1b1c"/>
              <link rel="icon" type="image/x-icon" href="/favicon.ico"/>

              <meta property="og:type" content="website"/>
              <meta property="og:url" content={window.location.href}/>
              <meta property="og:locale" content="ru_RU"/>
              <meta property="og:title" content="Adorazel Online"/>
              <meta property='og:site_name' content='Adorazel Online'/>
              <meta property="og:description" content=""/>
              <meta property="og:image" content={`${window.location.origin}/static/meta/logo-share.png`}/>

              <meta name="twitter:card" content="summary_large_image"/>
              <meta name="twitter:url" content={window.location.href}/>
              <meta name="twitter:title" content="Adorazel Online"/>
              <meta name="twitter:description" content=""/>
              <meta name="twitter:image" content={`${window.location.origin}/static/meta/logo-share.png`}/>
              <meta name="twitter:site" content="@Adorazel"/>
              <meta name="twitter:creator" content="@Adorazel"/>

              <link rel="canonical" href={window.location.href}/>
              <link rel="alternate" href={window.location.href} hrefLang="x-default"/>

              <meta name="description" content=""/>
              <meta name="keywords" content=""/>
              <meta name="robots" content="index, follow"/>

              <meta name="author" content="Adorazel"/>
              <meta name="copyright" content="Adorazel"/>

              <base href={window.location.origin}/>

              <meta name="format-detection" content="telephone=no"/>
              <meta name="format-detection" content="address=no"/>

            </Helmet>
            <Router>
              <PageWrapper>
                <Switch>
                  <Route exact path="/portfolio/:id"><ProjectPage/></Route>
                  <Route exact path="/blog/:id"><PostPage/></Route>
                  <Route path="/portfolio"><PortfolioPage/></Route>
                  <Route path="/blog"><BlogPage/></Route>
                  <Route exact path="/about"><AboutPage/></Route>
                  <Route exact path="/contact"><ContactPage/></Route>
                  <Route exact path="/admin">{!adminLogin.isLogin ? <AdminPage/> : <Redirect to="/dashboard"/>}</Route>
                  <Route path="/dashboard">{adminLogin.isLogin ? <DashboardPage/> : <Redirect to="/admin"/>}</Route>
                  {/*<Route exact path="/login">{!userLogin.isLogin ? <LoginPage/> : <Redirect to="/cabinet"/>}</Route>*/}
                  {/*<Route path="/cabinet">{userLogin.isLogin ? <CabinetPage/> : <Redirect to="/login"/>}</Route>*/}
                  <Route exact path="/"><MainPage/></Route>
                  <Route><NotFountPage/></Route>
                </Switch>
              </PageWrapper>
            </Router>
            </SettingsContext.Provider>
          </NavContext.Provider>
        </UserContext.Provider>
      </AdminContext.Provider>
    </StorageContext.Provider>
  )
}

export default App
