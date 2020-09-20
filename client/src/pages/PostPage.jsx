import React, {useCallback, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import Gallery from "../components/Post/Gallery"
import useHttp from "../hooks/http.hook"
import useGallery from "../hooks/gallery.hook"
import {GET} from "../api"
import {stripTags} from "../utils"
import Helmet from "react-helmet"
import Error from "../components/Error"
import {Parser} from "html-to-react"

const PostPage = () => {

  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const {gallery, getGallery} = useGallery()
  const {id} = useParams()
  const {request} = useHttp()
  const parser = new Parser()

  const getPost = useCallback(async () => {
    const data = await request(...GET("posts", id, {
      published: true,
      owner: "blog/posts",
    }))
    if (data) return setPost(data)
    setNotFound(true)
  }, [id, request, setPost, setNotFound])

  useEffect(() => {
    if (!post) getPost()
  }, [post, getPost])

  useEffect(() => {
    if (!gallery && post) {
      getGallery([[post.image]], true)
    }
  }, [post, gallery, getGallery])

  return (
    <div className="content-body">
      {notFound && <Error error={404}/>}
      {post && <>
        <Helmet>
          <title>{`${stripTags(post.title)} | Adorazel Online`}</title>
        </Helmet>
        <section className="post-page">
          <div className="container py-5">
            <div className="row">
              <div className="col-12 col-lg-8 mb-5">
                <h1 className="h2 text-primary font-weight-light mb-3 mb-md-4">
                  {parser.parse(post.longtitle)}
                </h1>
                {parser.parse(post.richtext)}
              </div>
              {<Gallery items={post.gallery}/>}
            </div>
          </div>
        </section>
      </>}
    </div>
  )
}

export default PostPage