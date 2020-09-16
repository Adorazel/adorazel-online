import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.scss"
import useInterval from "../../../hooks/interval.hook"
import useGallery from "../../../hooks/gallery.hook"

const Tile = ({_id, title, description, uri, gallery: _gallery}) => {

  _gallery = JSON.parse(_gallery)

  const [isLoaded, setIsLoaded] = useState(false)
  const [flip, setFlip] = useState(Math.random() > .5)
  const {gallery, getGallery} = useGallery()
  const flipHandler = () => setFlip(!flip)

  useInterval(() => {
    setFlip(!flip);
  }, ((Math.random() * 100) + 50) * 100)

  useEffect(() => {
    if (!isLoaded) {
      getGallery(_gallery)
      setIsLoaded(true)
    }
  }, [getGallery, _id, _gallery, setIsLoaded, isLoaded])

  const SETTINGS = {
    arrows: false,
    vertical: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: Math.random() * 5000 + 2500,
    initialSlide: Math.round(Math.random() * _gallery.length),
  }

  return (
    <div className={`tile${flip ? " flip" : ""}`} onClick={flipHandler}>
      <div className="back">
        <h4>{title}</h4>
        <p>{description}</p>
        <Link to={uri} className="more text-decoration-none">Подробнее</Link>
      </div>
      {!gallery && <div className="front">
        <div className="placeholder">
          <div className="spinner-border text-primary"/>
        </div>
      </div>}
      {gallery && <Slider className="front" {...SETTINGS}>
        {gallery.map(items => {
          return <div key={`${_id}`} className="img-placeholder">
            <picture className="img-fluid d-block">
              {items.slice(1).reverse().map((source, index) => {
                let media = ""
                switch (index) {
                  case (0):
                    media = "(min-width: 1200px)"
                    break
                  case (1):
                    media = "(min-width: 768px)"
                    break
                  case (2):
                    media = "(min-width: 451px)"
                    break
                  default:
                    break
                }
                return <source key={`${_id}_${index}`} media={media} srcSet={source}/>
              })}
              <img src={items[0]} className="img-fluid d-block" alt={title}/>
            </picture>
          </div>
        })}
      </Slider>}
    </div>
  )
}

export default Tile

