import React from "react"
import {Helmet} from "react-helmet"

const HeadMeta = () => <Helmet>

  <title>Adorazel Online</title>
  <meta name="title" content="Adorazel Online"/>

  <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
  <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>

  <link rel="apple-touch-icon" sizes="57x57" href="/static/meta/apple-icon-57x57.png"/>
  <link rel="apple-touch-icon" sizes="60x60" href="/static/meta/apple-icon-60x60.png"/>
  <link rel="apple-touch-icon" sizes="72x72" href="/static/meta/apple-icon-72x72.png"/>
  <link rel="apple-touch-icon" sizes="76x76" href="/static/meta/apple-icon-76x76.png"/>
  <link rel="apple-touch-icon" sizes="114x114" href="/static/meta/apple-icon-114x114.png"/>
  <link rel="apple-touch-icon" sizes="120x120" href="/static/meta/apple-icon-120x120.png"/>
  <link rel="apple-touch-icon" sizes="144x144" href="/static/meta/apple-icon-144x144.png"/>
  <link rel="apple-touch-icon" sizes="152x152" href="/static/meta/apple-icon-152x152.png"/>
  <link rel="apple-touch-icon" sizes="180x180" href="/static/meta/apple-icon-180x180.png"/>
  <link rel="manifest" href="/static/meta/manifest.json"/>
  <meta name="msapplication-config" content="/static/meta/browserconfig.xml"/>
  <meta name="theme-color" content="#1b1b1c"/>
  <link rel="icon" type="image/x-icon" href="/favicon.ico"/>

  <meta property="og:type" content="website"/>
  <meta property="og:url" content={window.location.href}/>
  <meta property="og:locale" content="ru_RU"/>
  <meta property="og:title" content="Adorazel Online"/>
  <meta property='og:site_name' content='Adorazel Online'/>
  <meta property="og:description" content=""/>
  <meta property="og:image" content={`${window.location.origin}/static/meta/logo-share.png`}/>

  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:url" content={window.location.href}/>
  <meta name="twitter:title" content="Adorazel Online"/>
  <meta name="twitter:description" content=""/>
  <meta name="twitter:image" content={`${window.location.origin}/static/meta/logo-share.png`}/>
  <meta name="twitter:site" content="@Adorazel"/>
  <meta name="twitter:creator" content="@Adorazel"/>

  <link rel="canonical" href={window.location.href}/>
  <link rel="alternate" href={window.location.href} hrefLang="x-default"/>

  <meta name="description" content=""/>
  <meta name="keywords" content=""/>
  <meta name="robots" content="index, follow"/>

  <meta name="author" content="Adorazel"/>
  <meta name="copyright" content="Adorazel"/>

  <base href={window.location.origin}/>

  <meta name="format-detection" content="telephone=no"/>
  <meta name="format-detection" content="address=no"/>

</Helmet>

export default HeadMeta