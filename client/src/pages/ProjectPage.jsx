import React, {useCallback, useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import SliceboxSlider from "../components/Porfolio/SliceboxSlider"
import useHttp from "../hooks/http.hook"
import useGallery from "../hooks/gallery.hook"
import {GET} from "../api"
import {stripTags} from "../utils"
import Helmet from "react-helmet"
import Error from "../components/Error"
import {Parser} from "html-to-react"


const ProjectPage = () => {

  const [project, setProject] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const {gallery, getGallery} = useGallery()
  const {id} = useParams()
  const {request} = useHttp()
  const parser = new Parser()

  const getProject = useCallback(async () => {
    const data = await request(...GET("projects", id, {
      published: true,
      owner: "portfolio/projects",
    }))
    if (data) return setProject(data)
    setNotFound(true)
  }, [id, request, setProject, setNotFound])

  useEffect(() => {
    if (!project) getProject()
  }, [project, getProject])

  useEffect(() => {
    if (!gallery && project) {
      getGallery([[project.image]], true)
    }
  }, [project, gallery, getGallery])

  return (
    <div className={`content-body${!project ? " position-relative" : ""}`}>
      {notFound && <Error error={404}/>}
      {project && <>
      <Helmet>
        <title>{`${stripTags(project.title)} | Adorazel Online`}</title>
      </Helmet>
      <section className="project-page">
        <div className="container py-5">
          <h1 className="h2 text-center text-shadow-primary text-primary font-weight-light mb-4">
            {parser.parse(project.description)}
          </h1>
          {parser.parse(project.richtext)}
          <SliceboxSlider className="mt-5 mb-0" items={project.gallery}/>
          <p className="text-center mt-4">
            <a href={project.uri} className="btn btn-primary text-uppercase mt-n4"
               target="_blank" rel="noopener noreferrer" onClick={event => event.target.blur()}>
              Посмотреть проект в сети
            </a>
          </p>
        </div>
      </section>
      </>}
    </div>
  )
}

export default ProjectPage