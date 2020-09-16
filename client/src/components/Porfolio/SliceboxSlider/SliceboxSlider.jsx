import React, {useEffect, useRef, useState} from "react"
import useGallery from "../../../hooks/gallery.hook"
import Slicebox from "../../../slicebox"

const SliceboxSlider = ({items, className}) => {

  items = JSON.parse(items)

  const [slicebox, setSlicebox] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const slider = useRef()

  const {gallery, getGallery} = useGallery()

  useEffect(() => {
    if (!isLoaded) {
      getGallery(items)
      setIsLoaded(true)
    }
  }, [getGallery, isLoaded, items])

  useEffect(() => {
    !slicebox && gallery && setSlicebox(new Slicebox(slider.current))
    slicebox && gallery && slicebox.init({
      autoplay: true,
      interval: 5000,
      speed: 1000,
      orientation: "r",
      cuboidsRandom: true,
      easing: "cubic-bezier(.23, 1, .32, 1)"
    })
    if (slicebox && gallery) {
      return () => slicebox.destroy(() => {
        setSlicebox(null)
      })
    }
  }, [slicebox, gallery])

  return (<>
      {!gallery && <div className="position-relative" style={{width: "100%", paddingBottom: "calc(52.08333333333333% + 58px + 6rem)"}}>
        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary"/>
        </div>
      </div>}
      {gallery && <div className={`slicebox-slider ${className}`}>
        <ul ref={slider} className="list-unstyled">
          {gallery.map((item, i) => <li key={items[i][0]}>
              <img src={item[0]} className="img-fluid" alt=""/>
            </li>
          )}
        </ul>
        <div className="sb-shadow"/>
      </div>}
    </>
  )
}

export default SliceboxSlider