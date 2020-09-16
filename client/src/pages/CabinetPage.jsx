import React from "react"
import {Helmet} from "react-helmet"
import SEO from "../components/SEO"

const CabinetPage = () => (
  <div className="content-body">
    <SEO
      title="Личный кабинет"
      robots="none"
    />
    <Helmet>
      <meta name="robots" content="none"/>
    </Helmet>
    <section className="dashboard-page">
      <div className="container py-5">
        <h1>Личный кабинет</h1>
      </div>
    </section>
  </div>
)

export default CabinetPage
