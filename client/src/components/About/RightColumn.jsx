import React, {useCallback, useEffect, useState} from "react"
import {Parser} from "html-to-react"
import useHttp from "../../hooks/http.hook"
import {GET_ALL} from "../../api"
import {getRating} from "../../utils"



const RightColumn = () => {

  const parser = new Parser()

  const [soft, setSoft] = useState(null)
  const [education, setEducation] = useState(null)

  const {request} = useHttp()

  const getSoft = useCallback(async () => {
    const data = await request(...GET_ALL("soft", {
      published: true,
      owner: "about/soft"
    }))
    data && setSoft(data)
  }, [request, setSoft])

  const getEducation = useCallback(async () => {
    const data = await request(...GET_ALL("education", {
      published: true,
      owner: "about/education",
      sort: "desc",
    }))
    data && setEducation(data)
  }, [request, setEducation])

  useEffect(() => {
    if (!soft) getSoft()
    if (!education) getEducation()
  }, [soft, education, getSoft, getEducation])

  const spinner = <div className="d-flex justify-content-center align-items-center py-5">
    <div className="spinner-border text-primary"/>
  </div>

  return (
    <div className="right-column text-left px-3 px-sm-4 px-md-0">
      <h3 className="h3 title dotted mb-3 mt-4">Образование</h3>
      {!education && spinner}
      {education && <ul className="list-unstyled">
        {education.map(({place, post, date}) => (
          <li key={place + post}>
            <h4 className="h5 text-primary text-shadow">{place}</h4>
            <p className="mb-1">{post}</p>
            <p><small>{date}</small></p>
          </li>
        ))}
      </ul>}
      <h3 className="h3 title dotted mb-3 mt-4">Software</h3>
      {!soft && spinner}
      {soft && <ul className="list-unstyled skills">
        {soft.map(({title, rating}) => (
          <li key={title} className="d-flex justify-content-start align-items-center">
          <span className="d-flex mr-3 text-primary">
            {getRating(rating).map((icon, i) => <i key={i} className={icon}/>)}
          </span>
            <span className="text">{parser.parse(title)}</span>
          </li>
        ))}
      </ul>}
    </div>
  )
}

export default RightColumn