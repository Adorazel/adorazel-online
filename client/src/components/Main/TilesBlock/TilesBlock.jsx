import React, {useCallback, useEffect, useState} from "react"
import {GET_ALL} from "../../../api"
import useHttp from "../../../hooks/http.hook"
import Tile from "../Tile"

const TilesBlock = () => {

  const [tiles, setTiles] = useState(null)
  const {request} = useHttp()

  const getTiles = useCallback(async () => {
    const data = await request(...GET_ALL("tiles", {
      published: true,
      owner: "main/tiles"
    }))
    setTiles(data)
  }, [request])

  useEffect(() => {
    if (!tiles) getTiles()
  }, [tiles, getTiles])

  const empty = []
  let i = 8
  for(; i; i--) {
    empty.push("")
  }

  return (
    <section className="tiles-block pattern">
      <div className="container">
        <div className="tiles-grid">
          {!tiles && empty.map((_, i) => <div key={i} className="tile">
            <div className="front">
              <div className="placeholder d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary"/>
              </div>
            </div>
          </div>)}
          {tiles && tiles.map(tile => <Tile key={tile._id} {...tile}/>)}
        </div>
      </div>
    </section>
  )
}

export default TilesBlock


