import React, {useContext} from "react"
import TilesBlock from "../components/Main/TilesBlock"
import SkillsSlider from "../components/Main/SkillsSlider"
import TimelineBlock from "../components/Main/TimelineBlock"
import SEO from "../components/SEO"
import SettingsContext from "../context/SettingsContext"

const MainPage = () => {

  const {main_description, main_keywords} = useContext(SettingsContext)

  return (
    <div className="content-body">
      <SEO
        description={main_description}
        keywords={main_keywords}
      />
      <TilesBlock/>
      <SkillsSlider/>
      <TimelineBlock/>
    </div>
  )
}

export default MainPage


