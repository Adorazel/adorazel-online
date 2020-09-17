import React, {useCallback, useEffect, useState} from "react"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import {YMInitializer} from "react-yandex-metrika"
import ReactGA from "react-ga"
import StorageContext from "./context/StorageContext"
import AdminContext from "./context/AdminContext"
import UserContext from "./context/UserContext"
import NavContext from "./context/NavContext"
import SettingsContext from "./context/SettingsContext"


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
import HeadMeta from "./components/HeadMeta"

import useAuth from "./hooks/auth.hook"
import useStorage from "./hooks/storage.hook"
import useHttp from "./hooks/http.hook"
import {GET_ALL} from "./api"

import {v4 as uuidv4} from "uuid"
import * as JivoSite from "react-jivosite";


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

  let gaId = null
  if (settings) gaId = settings.global_analytics

  useEffect(() => {
    const pathname = window.location.pathname
    if (gaId && pathname !== "/admin" && pathname !== "/dashboard") {
      ReactGA.initialize(gaId)
      ReactGA.pageview(pathname + window.location.search)
    }
  }, [gaId])

  return (
    <StorageContext.Provider value={{...storage}}>
      <AdminContext.Provider value={{...adminLogin}}>
        <UserContext.Provider value={{...userLogin}}>
          <NavContext.Provider value={[...nav, /*manage*/]}>
            <SettingsContext.Provider value={{...settings}}>
              <HeadMeta/>
              {settings && settings.global_metrika && <YMInitializer
                accounts={[+settings.global_metrika]}
                options={{webvisor: true}}
              />}
              {settings && settings.global_jivosite && <JivoSite.Widget
                id={settings.global_jivosite}
              />}
              <Router>
                <PageWrapper excludedPaths={/(admin|dashboard)/gi}>
                  <Switch>
                    {/* Редиректы со старого сайта */}
                    <Route exact path="/about-me/">
                      <Redirect to="/about"/>
                    </Route>
                    <Route exact path="/portfolio/shop-happy-ocean/">
                      <Redirect to="/portfolio/5f5608a6dc3c51020bdd7abd"/>
                    </Route>
                    <Route exact path="/portfolio/intergroup/">
                      <Redirect to="/portfolio/5f560866dc3c51020bdd7aba"/>
                    </Route>
                    <Route exact path="/portfolio/wizart/">
                      <Redirect to="/portfolio/5f560796dc3c51020bdd7ab5"/>
                    </Route>
                    <Route exact path="/portfolio/artisan/">
                      <Redirect to="/portfolio/5f560761dc3c51020bdd7ab3"/>
                    </Route>
                    <Route exact path="/portfolio/companion/">
                      <Redirect to="/portfolio/5f560716dc3c51020bdd7ab1"/>
                    </Route>
                    <Route exact path="/portfolio/delfin/">
                      <Redirect to="/portfolio/5f5606b3dc3c51020bdd7aae"/>
                    </Route>
                    <Route exact path="/portfolio/metronix/">
                      <Redirect to="/portfolio/5f560656dc3c51020bdd7aac"/>
                    </Route>
                    <Route exact path="/blog/24-metronix/">
                      <Redirect to="/blog/5f5f0d15bb119908c9c72ddd"/>
                    </Route>

                    <Route exact path="/portfolio/:id"><ProjectPage/></Route>
                    <Route exact path="/blog/:id"><PostPage/></Route>
                    <Route path="/portfolio"><PortfolioPage/></Route>
                    <Route path="/blog"><BlogPage/></Route>
                    <Route exact path="/about"><AboutPage/></Route>
                    <Route exact path="/contact"><ContactPage/></Route>
                    <Route exact path="/admin">{!adminLogin.isLogin ? <AdminPage/> :
                      <Redirect to="/dashboard"/>}</Route>
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
