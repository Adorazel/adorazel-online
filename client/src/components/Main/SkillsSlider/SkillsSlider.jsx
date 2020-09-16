import React, {useCallback, useEffect, useState} from "react"
import {Tooltip} from "react-tippy"
import Slider from "react-slick"
import useHttp from "../../../hooks/http.hook"
import {GET_ALL} from "../../../api"
import {shuffle} from "../../../utils"
import useResize from "../../../hooks/resize.hook"


const SkillsSlider = () => {

  const [skills, setSkills] = useState(null)
  const {request} = useHttp()

  const getSkills = useCallback(async () => {
    const data = await request(...GET_ALL("skills", {
      published: true,
      owner: "main/skills"
    }))
    setSkills(shuffle(data))
  }, [request])

  useEffect(() => {
    if (!skills) getSkills()
  }, [skills, getSkills])

  let settings = {}

  if (skills) {
    settings = {
      arrows: false,
      pauseOnHover: false,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: skills.length < 8 ? skills.length : 8,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 5
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        }
      }, {
        breakpoint: 380,
        settings: {
          slidesToShow: 2,
        }
      }]
    }
  }

  const {x} = useResize()
  let items = 2
  if (x > 379) items = 3
  if (x > 519) items = 4
  if (x > 767) items = 5
  if (x > 991) items = 8

  const empty = []
  for (; items; items--) {
    empty.push(0)
  }

  const emptyStyle = {
    padding: "10px 0 10px",
    margin: "0 -10px",
    width: "calc(100% + 18px)"
  }

  return (
    <section className="skills-slider">
      <div className="container">
        {!skills && <div className="d-flex justify-content-between slick-slider" style={emptyStyle}>
          {empty.map((_, i) => <div key={i} className="skill-tooltip mb-4">
            <div className="skill"/>
          </div>)}
        </div>}
        {skills && <Slider {...settings}>
          {skills.map(({_id, title, icon, link}) => (
            <Tooltip key={_id} className="skill-tooltip mb-4" position="bottom" title={title}>
              <a href={link} className="skill" target="_blank" rel="noreferrer noopener">
                <i className={`icon icon-${icon}`}/>
              </a>
            </Tooltip>
          ))}
        </Slider>}
      </div>
    </section>
  )
}

export default SkillsSlider

