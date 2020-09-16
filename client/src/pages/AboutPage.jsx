import React, {useContext, useEffect} from "react"
import SEO from "../components/SEO"
import MiddleColumn from "../components/About/MiddleColumn"
import LeftColumn from "../components/About/LeftColumn"
import RightColumn from "../components/About/RightColumn"
import useGallery from "../hooks/gallery.hook"
import SettingsContext from "../context/SettingsContext"


const AboutPage = () => {

  const {
    about_title,
    about_description,
    about_keywords,
    about_image
  } = useContext(SettingsContext)

  const {gallery, getGallery} = useGallery()

  useEffect(() => {
    if (!gallery && about_image) {
      getGallery([[about_image]], true)
    }
  }, [about_image, gallery, getGallery])

  return (
    <div className="content-body">
      <SEO
        title={about_title}
        description={about_description}
        keywords={about_keywords}
        image={gallery ? gallery[0][0] : null}
      />
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

