import React, {useCallback, useEffect, useState} from "react"
import {Parser} from "html-to-react"
import useHttp from "../../hooks/http.hook"
import {GET_ALL} from "../../api"
import {getRating} from "../../utils"


const LeftColumn = () => {

  const parser = new Parser()

  const [skills, setSkills] = useState(null)
  const [work, setWork] = useState(null)
  const {request} = useHttp()

  const getSkills = useCallback(async () => {
    const data = await request(...GET_ALL("skills", {
      published: true,
      owner: "about/skills",
    }))
    data && setSkills(data)
  }, [request, setSkills])

  const getWork = useCallback(async () => {
    const data = await request(...GET_ALL("work", {
      published: true,
      owner: "about/work",
      sort: "desc",
    }))
    data && setWork(data)
  }, [request, setWork])

  useEffect(() => {
    if (!work) getWork()
    if (!skills) getSkills()
  }, [skills, work, getSkills, getWork])

  const spinner = <div className="d-flex justify-content-center align-items-center py-5">
    <div className="spinner-border text-primary"/>
  </div>

  return (
    <div className="left-column text-lg-right px-3 px-sm-4 px-md-0">
      <h3 className="h3 title dotted mb-3 mt-4">Опыт работы</h3>
      {!work && spinner}
      {work && <ul className="list-unstyled">
        {work.map(({place, post, date}) => {
          return <li key={place + post}>
            <h4 className="h5 text-primary text-shadow">{place}</h4>
            <p className="mb-1">{post}</p>
            <p><small>{date}</small></p>
          </li>
        })}
      </ul>}
      <h3 className="h3 title dotted mb-3 mt-4">Skills</h3>
      {!skills && spinner}
      {skills && <ul className="list-unstyled skills">
        {skills.map(({title, rating}) => (
          <li key={title} className="d-flex flex-lg-row-reverse justify-content-start align-items-center">
          <span className="d-flex flex-lg-row-reverse ml-lg-3 mr-3 mr-lg-0 text-primary">
            {getRating(rating).map((icon, i) => <i key={i} className={icon}/>)}
          </span>
            <span className="text">{parser.parse(title)}</span>
          </li>
        ))}
      </ul>}
    </div>
  )
}

export default LeftColumn