import React, {useContext, useEffect, useState} from "react"
import MiddleColumn from "../components/About/MiddleColumn"
import LeftColumn from "../components/About/LeftColumn"
import RightColumn from "../components/About/RightColumn"
import SettingsContext from "../context/SettingsContext"
import Helmet from "react-helmet"
import {stripTags} from "../utils"

const AboutPage = () => {

  const {about_title} = useContext(SettingsContext)
  const [title, setTitle] = useState(null)

  useEffect(() => {
    about_title && setTitle(`${stripTags(about_title)} | Adorazel Online`)
  }, [about_title])

  return (
    <div className="content-body">
      <Helmet>
        {title && <title>{title}</title>}
      </Helmet>
      <section className="about-page">
        <div className="container pt-5 pb-lg-5">
          <h1 hidden>Adorazel</h1>
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="row flex-lg-row-reverse">
                <div className="col-12 col-sm-8 mx-sm-auto col-md-6 ">
                  <MiddleColumn/>
                </div>
                <div className="col-12 col-sm-8 mx-sm-auto col-md-6">
                  <LeftColumn/>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-8 mx-sm-auto col-md-6 ml-md-auto mr-md-0 col-lg-4">
              <RightColumn/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

