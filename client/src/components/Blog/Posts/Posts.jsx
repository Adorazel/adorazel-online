import React, {useCallback, useEffect, useRef, useState} from "react"
import Isotope from "isotope-layout"
import imagesLoaded from "imagesloaded"
import {Link} from "react-router-dom"
import {Parser} from "html-to-react"
import useHttp from "../../../hooks/http.hook"
import useGallery from "../../../hooks/gallery.hook"
import {getDate} from "../../../utils"
import {GET_ALL} from "../../../api"


const Posts = () => {

  const parser = new Parser()
  const grid = useRef()
  const {request} = useHttp()
  const {gallery, getGallery} = useGallery()
  const [iso, setIso] = useState(null)
  const [allTags, setAllTags] = useState(null)
  const [tags, setTags] = useState(null)
  const [posts, setPosts] = useState(null)

  const getPosts = useCallback(async () => {
    const data = await request(...GET_ALL("posts", {
      published: true,
      owner: "blog/posts",
    }))
    data && setPosts(data)
  }, [request, setPosts])

  const getTags = useCallback(async () => {
    const data = await request(...GET_ALL("tags", {
      owner: "blog/tags",
    }))
    data && setAllTags(data)
  }, [request, setAllTags])

  useEffect(() => {
    if (!tags) getTags()
  }, [tags, getTags])

  useEffect(() => {
    if (!posts) getPosts()
  }, [posts, getPosts])

  useEffect(() => {
    if (!gallery && posts) {
      const photos = []
      posts.forEach(({image}) => {
        photos.push([image])
      })
      getGallery(photos)
    }
  }, [posts, gallery, getGallery])

  useEffect(() => {
    if (!tags && allTags && posts) {
      // Фильтрация тэгов -- Пока не требуется
      // let allPostsTagsValues = []
      // posts.forEach(({posttags}) => {
      //   allPostsTagsValues.push(JSON.parse(posttags))
      // })
      // allPostsTagsValues = allPostsTagsValues.join(",").split(",")
      // const usedTags = allTags.filter(tag => allPostsTagsValues.includes(tag.key))
      setTags(allTags) // Поменять на usedTags
    }
  }, [tags, allTags, posts])


  useEffect(() => {
    if (!iso && posts && gallery) {
      imagesLoaded(grid.current, instance => {
        if (instance.isComplete) {
          const instance = new Isotope(grid.current, {
            itemSelector: ".grid-item",
            percentPosition: true,
            masonry: {
              columnWidth: ".grid-sizer"
            }
          })
          setIso(instance)
        }
      })
    }
  }, [iso, posts, gallery])

  const setFilter = (value, event) => {
    [...document.querySelectorAll(".blog-filter .label")].forEach(label => {
      label.classList.remove("active")
    })
    event.target.classList.add("active")
    iso.arrange({filter: value})
  }

  return (
    <div className="container py-5">
      {tags && <ul className="blog-filter list-inline text-center">
        <li className="d-inline-block">
          <button className="label active" onClick={setFilter.bind(this, "*")}>
            <span data-title="Всё">Всё</span>
          </button>
        </li>
        {tags.map(({_id, key, name}) => (
          <li key={_id} className="d-inline-block">
            <button className="label" onClick={setFilter.bind(this, `.${key}`)}>
              <span data-title={name}>{name}</span>
            </button>
          </li>
        ))}
      </ul>}
      {posts && gallery && <div ref={grid} className="grid row mx-n2">
        <div className="grid-sizer col-12 col-sm-6 col-lg-4 px-2"/>
        {posts.map(({_id, title, longtitle, introtext, posttags, publishedon}, i) => (
          <div key={_id}
               className={`grid-item col-12 col-md-6 col-lg-4 px-2 mb-3 ${JSON.parse(posttags).join(" ")}`}>
            <div className="card pattern">
              <div className="card-img-top">
                <img src={gallery[i][0]} alt={title}/>
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{longtitle}</h5>
                <div className="published text-uppercase">{getDate(publishedon)}</div>
                {parser.parse(introtext)}
                <Link to={`/blog/${_id}`} className="btn btn-outline-primary text-uppercase">Читать дальше</Link>
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default Posts