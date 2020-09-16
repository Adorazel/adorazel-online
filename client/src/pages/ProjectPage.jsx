import React, {useCallback, useEffect, useState} from "react"
import {useHistory, useParams} from 'react-router-dom'
import {Parser} from "html-to-react"
import SEO from "../components/SEO"
import Loader from "../components/Loader"
import SliceboxSlider from "../components/Porfolio/SliceboxSlider"
import useHttp from "../hooks/http.hook"
import useParser from "../hooks/parser.hook"
import useGallery from "../hooks/gallery.hook"
import {GET} from "../api"


const ProjectPage = () => {

  const parser = new Parser()

  const [project, setProject] = useState(null)
  const history = useHistory()
  const {gallery, getGallery} = useGallery()
  const {id} = useParams()
  const {request} = useHttp()

  const getProject = useCallback(async () => {
    const data = await request(...GET("projects", id, {
      published: true,
      owner: "portfolio/projects",
    }))
    if (data) return setProject(data)
    history.push("/404")
  }, [id, request, history, setProject])

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
      <SEO
        title={useParser(project && project.title ? project.title : "")}
        description={useParser(project && project.description ? project.description : "")}
        keywords={useParser(project && project.keywords ? project.keywords : "")}
        image={gallery ? gallery[0][0] : null}
      />
      {!project && <Loader className="position-absolute h-100 w-100"/>}
      {project && <section className="project-page">
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
      </section>}
    </div>
  )
}

export default ProjectPage