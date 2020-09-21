import React, {useState, useEffect, useCallback, useContext} from "react"
import {Tooltip} from "react-tippy"
import SettingsContext from "../../../context/SettingsContext";

const INSTAGRAM_BASE_URL = "https://www.instagram.com"

const InstagramFeed = () => {

  const [instagramData, setInstagramData] = useState(null)
  const {main_instagram} = useContext(SettingsContext)

  const getData = useCallback(() => {
    fetch(INSTAGRAM_BASE_URL + `/${main_instagram}/`, {referrer: "", referrerPolicy: "no-referrer"})
      .then(response => response.text()).then(data => {
      let json = data.match(/<script type="text\/javascript">window\._sharedData = (.*?)<\/script>/)
      json = json[0]
        .replace('<script type="text/javascript">window._sharedData = ', '')
        .replace('</script>', '')
      json = JSON.parse(json.substring(0, json.length - 1))
      if (json.entry_data.ProfilePage) {
        json = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges
        json = json.slice(0, 6)
        setInstagramData(json)
      }
    }).catch(error => console.log(error))
  }, [main_instagram])

  useEffect(() => {
    main_instagram && getData()
  }, [main_instagram, getData])

  const empty = []
  for(let i = 0; i < 6; i++) {
    empty.push(0)
  }

  return (
    <div className="instagram-feed">
      <div className="row mx-0">
        {!instagramData && empty.map((_, i) => <div key={i} className="col-4 img-thumbnail border-bottom border-right border-dark p-1">
          <div className="overflow-hidden img-wrapper">
            <div className="placeholder">
              <div className="spinner-border text-primary"/>
            </div>
          </div>
        </div>)}
        {instagramData && instagramData.map(({node}) => (
          <Tooltip key={node.id} position="bottom" title={node.location && node.location.name}
                   className="col-4 d-block img-thumbnail border-bottom border-right border-dark p-1">
            <a href={INSTAGRAM_BASE_URL + "/p/" + node.shortcode} className="d-block overflow-hidden img-wrapper"
               target="_blank" rel="noreferrer noopener">
              <img src={node.thumbnail_resources[0].src} className="img-fluid" alt={node.accessibility_caption}/>
            </a>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default InstagramFeed

