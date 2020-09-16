import React, {useEffect, useState, useRef} from "react"
import {Link} from "react-router-dom"
import SimpleBar from "simplebar-react"
import {Tooltip} from "react-tippy"
import {Parser} from "html-to-react"
import Loader from "../../Loader"
import useResize from "../../../hooks/resize.hook"
import useGallery from "../../../hooks/gallery.hook"
import useClipboard from "../../../hooks/clipboard.hook"


const Grid = ({mobile, projects, current, toggleHandler}) => {

  const parser = new Parser()

  const [pageSize, setPageSize] = useState({x: 0, y: 0})
  const [itemSize, setItemSize] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const gridScroll = useRef()
  const {x, y} = useResize()
  const {gallery, getGallery} = useGallery()

  useEffect(() => {
    if (!gallery && projects) {
      const gal = []
      projects.forEach(({image, description}, i) => {
        gal[i] = [image]
      })
      getGallery(gal)
    }
  }, [gallery, projects, getGallery])


  useEffect(() => {
    if (
      gridScroll
      && mobile
      && (x !== pageSize.x || gridScroll.current.getScrollElement().offsetWidth !== itemSize * 2)
    ) {
      setPageSize({...pageSize, x})
      setItemSize(gridScroll.current.getScrollElement().offsetWidth / 2)
    }
  }, [mobile, pageSize, x, itemSize])

  useEffect(() => {
    if (
      gridScroll
      && !mobile
      && (y !== pageSize.y || gridScroll.current.getScrollElement().offsetHeight !== itemSize * 2)
    ) {
      setPageSize({...pageSize, y})
      setItemSize(gridScroll.current.getScrollElement().offsetHeight / 2)
    }

  }, [mobile, pageSize, y, itemSize])

  const scrollHandler = event => {
    if (!isScrolling) {
      setIsScrolling(true)
      const scrollElement = gridScroll.current.getScrollElement()
      const size = scrollElement.offsetHeight / 2
      scrollElement.scrollLeft += event.deltaY / Math.abs(event.deltaY) * Math.ceil(size)
      setTimeout(() => setIsScrolling(false), 250)
    }
  }

  return (
    <SimpleBar ref={gridScroll} className="flex-grow-1" style={{overflowY: "hidden"}}
               onWheel={scrollHandler.bind(this)}>
      {!projects && !current && <Loader className="h-100 w-100"/>}
      {projects && current && <div className="portfolio-grid">
        {projects.map(({_id, title, description, uri}, i) => (
          <div key={_id} className={`portfolio-grid__item${_id === current._id ? " active" : ""}`}
               style={{width: itemSize + "px", height: itemSize + "px"}}>
            {!gallery && <div className="image d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary"/>
            </div>}
            {gallery && <img src={gallery[i][0]} className="image" alt={title}/>}
            <div className="fade"/>
            <h3 className="title h5 text-right font-weight-bold text-uppercase ">
              {parser.parse(description)}
            </h3>
            <Link to={`/portfolio/${_id}`} className="link stretched-link"/>
            <div className="icons-wrapper">
              <Tooltip className="icon rounded-circle" position="bottom" title="Смотреть проект">
                <Link to={`/portfolio/${_id}`} className="d-block rounded-circle text-white"
                      onClick={toggleHandler.bind(this, projects[i])}>
                  <i className="icon-more"/>
                </Link>
              </Tooltip>
              <Tooltip className="icon share rounded-circle" position="bottom" title="Поделиться ссылкой на проект">
                <span className="d-block rounded-circle text-white"
                      onClick={useClipboard.bind(this, {
                        text: `${window.location.href}/${_id}`,
                        message: "Ссылка на проект скопирована в буфер обмена"
                      })}>
                  <i className="icon-share"/>
                </span>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>}
    </SimpleBar>
  )
}

export default Grid