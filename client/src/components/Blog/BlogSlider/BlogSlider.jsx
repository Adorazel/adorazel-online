import React, {useCallback, useEffect, useRef, useState} from "react"
import Slider from "react-slick"
import Loader from "../../Loader"
import useHttp from "../../../hooks/http.hook"
import useGallery from "../../../hooks/gallery.hook"
import {debounce, getWindowSize} from "../../../utils"
import {GET_ALL} from "../../../api"


const BlogSlider = () => {

  const slider = useRef()
  const slick = useRef()
  const [slides, setSlides] = useState(null)
  const {request} = useHttp()
  const {gallery, getGallery} = useGallery()

  const getSlides = useCallback(async () => {
    const data = await request(...GET_ALL("slides", {
      published: true,
      owner: "blog/slides",
    }))
    data && setSlides(data)
  }, [request, setSlides])

  useEffect(() => {
    if (!slides) getSlides()
  }, [slides, getSlides])

  useEffect(() => {
    if (!gallery && slides) {
      const photos = []
      slides.forEach(({image}) => {
        photos.push([image])
      })
      getGallery(photos)
    }
  }, [slides, gallery, getGallery])


  const resizeListener = debounce(() => {
    const h = getWindowSize().width * 720 / 1920
    if (slider && slider.current) {
      slider.current.style.left = "0px"
      slider.current.style.top = -h + "px"
    }
    slick && slick.current && slick.current.forceUpdate(() => {
      // console.log("update")
    })
  }, 500)

  useEffect(() => {
    resizeListener()
    window.addEventListener("resize", resizeListener)
    return () => {
      window.removeEventListener("resize", resizeListener)
    }
  }, [resizeListener])


  const SampleArrow = ({className, style, onClick}) => (
    <button className={className} style={style} onClick={onClick}><span/></button>
  )

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    pauseOnHover: false,
    fade: false,
    vertical: true,
    centerMode: true,
    centerPadding: '0px',
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    nextArrow: <SampleArrow/>,
    prevArrow: <SampleArrow/>,
    appendDots: dots => <ul data-text="Избранные посты">{dots}</ul>,
  }

  return (
    <div className="blog-slider__wrapper">
      {!slides && !gallery && <div className="slider-loader"><Loader imgStyle={{maxWidth: "25vw"}}/></div>}
      {slides && gallery && <div ref={slider} className="blog-slider position-absolute w-100">
        <Slider ref={slick} {...settings}>
          {slides.map((item, i) => (
            <figure key={item._id} className="d-block m-0">
              <img src={gallery[i][0]} className="img-fluid" alt={item.title} width="1920"
                   height="720"/>
              <figcaption className="content">
                <h3 className="h4 title">{item.title} <strong>{item.description}</strong></h3>
              </figcaption>
            </figure>
          ))}
        </Slider>
      </div>}
    </div>
  )
}

export default BlogSlider
