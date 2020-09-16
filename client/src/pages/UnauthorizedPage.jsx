import React from "react"
import Error from "../components/Error"
import SEO from "../components/SEO"

export const UnauthorizedPage = () => <>
  <SEO
    title="Доступ запрещен"
    robots="none"
  />
  <Error error={401}/>
</>

