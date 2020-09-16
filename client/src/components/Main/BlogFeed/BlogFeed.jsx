import React, {useCallback, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {Parser} from "html-to-react"
import useHttp from "../../../hooks/http.hook"
import useGallery from "../../../hooks/gallery.hook"
import {GET_ALL} from "../../../api"

// import {declination} from "../../utils";

const BlogFeed = () => {

  const parser = new Parser()

  const [posts, setPosts] = useState(null)
  const {request} = useHttp()
  const {gallery, getGallery} = useGallery()

  const getPosts = useCallback(async () => {
    const data = await request(...GET_ALL("posts", {
      published: true,
      owner: "blog/posts",
    }))
    setPosts(data)
  }, [request, setPosts])

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


  return (
    <div className="blog-feed">
      {posts && posts.map(({_id, title, longtitle}, i) => {
        return <div key={_id} className="row blog-feed__post position-relative mx-0">
          <div className="col-4 p-1 img-thumbnail border-bottom border-right border-dark">
            <div className="overflow-hidden img-wrapper">
              {!gallery && <div className="placeholder"><div className="spinner-border text-primary"/></div>}
              {gallery && <img src={gallery[i][0]} className="img-fluid" alt={title}/>}
            </div>
          </div>
          <div className="col-8 d-flex flex-column justify-content-center pl-3 py-3 pr-0">
            <h6 className="h6 font-weight-light">{parser.parse(longtitle)}</h6>
            {/*<p className="small font-weight-light text-uppercase mb-0">*/}
            {/*  <i className="icon-comment-o mr-1"/>*/}
            {/*  {comments*/}
            {/*    ? `${comments} ${declination(comments, ['комментарий', 'комментария', 'комментариев'])}`*/}
            {/*    : "Без комментариев"}*/}
            {/*</p>*/}
          </div>
          <Link to={`/blog/${_id}`} className="stretched-link"/>
        </div>
      })}
    </div>
  )
}

export default BlogFeed
