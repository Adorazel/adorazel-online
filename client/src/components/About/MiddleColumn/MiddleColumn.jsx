import React, {useCallback, useContext, useEffect, useRef, useState} from "react"
import Parallax from 'parallax-js'
import {Tooltip} from "react-tippy"
import SettingsContext from "../../../context/SettingsContext"
import StorageContext from "../../../context/StorageContext"
import useHttp from "../../../hooks/http.hook"
import useParser from "../../../hooks/parser.hook"
import useGallery from "../../../hooks/gallery.hook"
import {GET_ALL, GET_FILE} from "../../../api"


const MiddleColumn = () => {

  const {
    about_avatar,
    about_photo,
    about_nickname,
    about_text,
    about_place,
    about_telegram,
    about_skype,
    about_email,
    about_resume,
    about_resumename
  } = useContext(SettingsContext)

  const {gallery, getGallery} = useGallery()
  const [social, setSocial] = useState(null)
  const [resume, setResume] = useState(false)
  const [leftParalax, setLeftParalax] = useState(null)
  const [rightParalax, setRightParalax] = useState(null)
  const [flip, setFlip] = useState(false)
  const cache = useContext(StorageContext).files

  const {request} = useHttp()
  const leftDoodles = useRef()
  const rightDoodles = useRef()

  const getSocial = useCallback(async () => {
    const data = await request(...GET_ALL("social", {
      published: true,
      owner: "about/social"
    }))
    data && setSocial(data)
  }, [request])

  const getResume = useCallback(async (id) => {
    const data = await request(...GET_FILE(id))
    if (data) {
      return new Promise((resolve, reject) => {
        fetch(data.path)
          .then(({url}) => resolve(url))
          .catch(error => reject(error))
      })
    }
    return null
  }, [request])

  useEffect(() => {
    if (!gallery && about_avatar && about_photo) {
      getGallery([[about_photo], [about_avatar]])
    }
  }, [about_avatar, about_photo, gallery, getGallery])

  useEffect(() => {
    if (!social) {
      getSocial()
    }
  }, [social, getSocial])

  useEffect(() => {
    if (!resume && about_resume) {
      getResume(about_resume).then(path => {
        setResume(path)
      })
    }
  }, [resume, getResume, about_resume, cache])

  useEffect(() => {
    if (!leftParalax) {
      const lp = new Parallax(leftDoodles.current)
      setLeftParalax(lp)
    }
    if (!rightParalax) {
      const rp = new Parallax(rightDoodles.current)
      setRightParalax(rp)
    }
    return () => {
      if (leftParalax) {
        leftParalax.destroy()
        setLeftParalax(null)
      }
      if (rightParalax) {
        rightParalax.destroy()
        setRightParalax(null)
      }
    }
  }, [leftParalax, rightParalax])

  return (
    <div className="middle-column position-relative">
      <div className="doodles-scaler d-none d-sm-block">
        <ul ref={leftDoodles} className="left-doodles list-unstyled">`
          <li className="layer" data-depth="0.20">
            <span className="doodle6"/>
            <span className="doodle23"/>
            <span className="doodle18"/>
            <span className="doodle16"/>
          </li>
          <li className="layer" data-depth="0.40">
            <span className="doodle7"/>
            <span className="doodle21"/>
            <span className="doodle19"/>
            <span className="doodle10"/>
            <span className="doodle4"/>
            <span className="doodle1"/>
            <span className="doodle24"/>
          </li>
          <li className="layer" data-depth="0.60">
            <span className="doodle3"/>
            <span className="doodle13"/>
            <span className="doodle11"/>
            <span className="doodle22"/>
            <span className="doodle5"/>
            <span className="doodle14"/>
            <span className="doodle20"/>
          </li>
          <li className="layer" data-depth="0.80">
            <span className="doodle9"/>
            <span className="doodle12"/>
            <span className="doodle25"/>
            <span className="doodle8"/>
            <span className="doodle15"/>

          </li>
          <li className="layer" data-depth="1.00">
            <span className="doodle17"/>
            <span className="doodle2"/>
          </li>
        </ul>
        <ul ref={rightDoodles} className="right-doodles list-unstyled">
          <li className="layer" data-depth="0.20">
            <span className="doodle6"/>
            <span className="doodle16"/>
            <span className="doodle1"/>
            <span className="doodle20"/>
            <span className="doodle9"/>
          </li>
          <li className="layer" data-depth="0.40">
            <span className="doodle7"/>
            <span className="doodle19"/>
            <span className="doodle4"/>
            <span className="doodle24"/>
            <span className="doodle15"/>
            <span className="doodle22"/>
            <span className="doodle12"/>
          </li>
          <li className="layer" data-depth="0.60">
            <span className="doodle13"/>
            <span className="doodle11"/>
            <span className="doodle5"/>
            <span className="doodle23"/>
            <span className="doodle10"/>

          </li>
          <li className="layer" data-depth="0.80">
            <span className="doodle25"/>
            <span className="doodle8"/>
            <span className="doodle26"/>
            <span className="doodle17"/>
            <span className="doodle14"/>
            <span className="doodle21"/>
            <span className="doodle3"/>
          </li>
          <li className="layer" data-depth="1.00">
            <span className="doodle2"/>
            <span className="doodle18"/>
          </li>
        </ul>
      </div>

      <div className="back-column">
        <div className="back-hex">
          <div className="white-hex">
            <div className="code-hex"/>
          </div>
        </div>
        <div className={`hex-wrapper${flip ? " flip" : ""}`}>
          {!gallery && <div className="hex avatar">
            <div className="d-flex justify-content-center align-items-center py-5" style={{transform: "scale(1.5)"}}>
              <div className="spinner-border text-primary"/>
            </div>
          </div>}
          {gallery && <div className="hex photo" style={{backgroundImage: `url(${gallery[0][0]})`}}
                           onClick={setFlip.bind(this, !flip)}>
            <div className="corner-1">
              <div className="before" style={{backgroundImage: `url(${gallery[0][0]})`}}/>
            </div>
            <div className="corner-2">
              <div className="before" style={{backgroundImage: `url(${gallery[0][0]})`}}/>
            </div>
          </div>}
          {gallery && <div className="hex avatar" style={{backgroundImage: `url(${gallery[1][0]})`}}
                           onClick={setFlip.bind(this, !flip)}>
            <div className="corner-1">
              <div className="before" style={{backgroundImage: `url(${gallery[1][0]})`}}/>
            </div>
            <div className="corner-2">
              <div className="before" style={{backgroundImage: `url(${gallery[1][0]})`}}/>
            </div>
          </div>}
        </div>
        <div className="content position-relative text-center px-3 px-sm-4 px-lg-3 px-xl-4 pb-4">
          {about_nickname && <h2 className="h1 text-uppercase font-weight-bold mb-4">
            {about_nickname}
          </h2>}
          {useParser(about_text)}
          {resume && <hr className="dotted"/>}
          {resume && <div className="resume">
            <a href={resume} download={about_resumename || "Резюме"}
               className="text-decoration-none text-uppercase font-weight-bold">Скачать моё резюме</a>
          </div>}
          <hr className="dotted"/>
          {about_place && <>
            <h5>Место:</h5>
            <p>{about_place}</p>
          </>}
          {about_telegram && <>
            <h5>Telegram:</h5>
            <p>{about_telegram}</p>
          </>}
          {about_skype && <>
            <h5>Skype:</h5>
            <p>{about_skype}</p>
          </>}
          {about_email && <>
            <h5>Email:</h5>
            <p>{about_email}</p>
          </>}
          <hr className="dotted"/>
          {social && <div className="row text-center social mx-0">
            {social.map(({title, icon, link}) => (
              <div key={title} className="col-3 px-0">
                <a href={link} target="_blank" rel="noreferrer noopener"
                   className="text-decoration-none text-white">
                  <Tooltip tag="span" position="bottom" title={title}>
                    <i className={`icon-${icon}`}/>
                  </Tooltip>
                </a>
              </div>
            ))}
          </div>}
        </div>
      </div>

    </div>
  )
}

export default MiddleColumn