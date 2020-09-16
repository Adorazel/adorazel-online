import React from "react"
import Error from "../components/Error"
import SEO from "../components/SEO"

const NotFountPage = () => <>
  <SEO
    title="Страница не найдена"
    robots="none"
  />
  <Error error={404}/>
</>

export default NotFountPage
