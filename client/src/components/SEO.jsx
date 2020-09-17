import React, {useContext} from "react"
import Helmet from "react-helmet"
import SettingsContext from "../context/SettingsContext"
import useParser from "../hooks/parser.hook"
import {stripTags} from "../utils"


const SEO = ({title, description = "", keywords = "", robots = "index, follow", image}) => {

  const {global_yandexVerification, global_googleSiteVerification} = useContext(SettingsContext)

  return (
    <Helmet>

      <title>{useParser(title ? `${stripTags(title)} | Adorazel Online` : "Adorazel Online")}</title>
      <meta name="title" content={useParser(title ? `${stripTags(title)} | Adorazel Online` : "Adorazel Online")}/>

      <meta name="twitter:title"
            content={useParser(title ? `${stripTags(title)} | Adorazel Online` : "Adorazel Online")}/>
      <meta name="twitter:description" content={useParser(stripTags(description))}/>
      <meta name="twitter:image" content={`${window.location.origin}/${image ? image : "static/meta/logo-share.png"}`}/>

      <meta property="og:title" content={title ? `${stripTags(title)} | Adorazel Online` : "Adorazel Online"}/>
      <meta property="og:description" content={useParser(stripTags(description))}/>
      <meta property="og:image" content={`${window.location.origin}/${image ? image : "static/meta/logo-share.png"}`}/>

      <meta name="description" content={useParser(stripTags(description))}/>
      <meta name="keywords" content={useParser(stripTags(keywords))}/>
      <meta name="robots" content={useParser(stripTags(robots))}/>

      {global_yandexVerification && <meta name="yandex-verification" content={global_yandexVerification}/>}
      {global_googleSiteVerification && <meta name="google-site-verification" content={global_googleSiteVerification}/>}

    </Helmet>
  )
}

export default SEO
