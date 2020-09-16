import React, {useCallback, useContext, useEffect, useState} from "react"
import SEO from "../components/SEO"
import Aside from "../components/Porfolio/Aside"
import Grid from "../components/Porfolio/Grid"
import Details from "../components/Porfolio/Details"
import useHttp from "../hooks/http.hook"
import useResize from "../hooks/resize.hook"
import {GET_ALL} from "../api"
import {shuffle} from "../utils"
import SettingsContext from "../context/SettingsContext"


const PortfolioPage = () => {

  const {portfolio_title, portfolio_description, portfolio_keywords} = useContext(SettingsContext)

  const [projects, setProjects] = useState(null)
  const [current, setCurrent] = useState(null)
  const [open, setOpen] = useState(false)
  const {request} = useHttp()
  const {x} = useResize()
  const mobile = x < 992

  useEffect(() => {
    if (!mobile) {
      const rootScroll = document.getElementById("root-simplebar")
      rootScroll.style.overflowY = "hidden"
      return () => {
        rootScroll.style.overflowY = ""
      }
    }
  }, [mobile])

  const getProjects = useCallback(async () => {
    const data = await request(...GET_ALL("projects", {
      published: true,
      owner: "portfolio/projects",
    }))
    if (data) {
      const halfIndex = Math.floor(data.length / 2)
      setProjects([
        ...shuffle(data.slice(0, halfIndex)),
        ...shuffle(data.slice(halfIndex, data.length))
      ])
    }
  }, [request, setProjects])

  useEffect(() => {
    if (!projects) getProjects()
  }, [projects, getProjects])

  useEffect(() => {
    if (projects) setCurrent(projects[0])
  }, [projects])


  const toggleHandler = (selected, event) => {
    if (x > 921) {
      event.preventDefault()
      selected && setCurrent(selected)
      setOpen(!open)
    }
  }

  return (
    <section
      className="portfolio-page content-body position-relative d-lg-flex align-items-stretch justify-content-between pb-0">
      <SEO
        title={portfolio_title}
        description={portfolio_description}
        keywords={portfolio_keywords}
      />
      <h1 hidden>Портфолио</h1>
      <Aside mobile={mobile} current={current} open={open} toggleHandler={toggleHandler}/>
      <Grid mobile={mobile} projects={projects} current={current} toggleHandler={toggleHandler}/>
      {!mobile && <Details current={current} open={open} toggleHandler={toggleHandler}/>}
    </section>
  )
}

export default PortfolioPage

