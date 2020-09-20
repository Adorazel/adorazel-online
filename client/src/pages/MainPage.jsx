import React from "react"
import TilesBlock from "../components/Main/TilesBlock"
import SkillsSlider from "../components/Main/SkillsSlider"
import TimelineBlock from "../components/Main/TimelineBlock"
import {Helmet} from "react-helmet"

const MainPage = () => {

  return (
    <div className="content-body">
      <Helmet>
        <title>Adorazel Online</title>
      </Helmet>
      <TilesBlock/>
      <SkillsSlider/>
      <TimelineBlock/>
    </div>
  )
}

export default MainPage


