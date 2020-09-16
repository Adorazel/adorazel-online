import React, {useEffect, useState} from "react"
import useGallery from "../../../hooks/gallery.hook"
import {LightgalleryProvider, LightgalleryItem} from "react-lightgallery"

const Gallery = ({items}) => {

  const [isLoaded, setIsLoaded] = useState(false)
  const {gallery, getGallery} = useGallery()

  useEffect(() => {
    if (!isLoaded) {
      getGallery(JSON.parse(items))
      setIsLoaded(true)
    }
  }, [getGallery, isLoaded, items])

  return (
    <div className="col-12">
      {gallery && <LightgalleryProvider>
        <div className="row mx-n2">
          {gallery.map((item, i) => (
            <div key={i} className="col-3 mb-3 px-2">
              <LightgalleryItem group="gallery" src={item[0]} thumb={item[1]}>
                <img src={item[1]} className="img-fluid" alt=""/>
              </LightgalleryItem>
            </div>
          ))}
        </div>
      </LightgalleryProvider>}
    </div>
  )
}

export default Gallery