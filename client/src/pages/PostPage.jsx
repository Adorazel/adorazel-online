import React, {useCallback, useEffect, useState} from "react"
import SEO from "../components/SEO"
import {useHistory, useParams} from "react-router-dom"
import Gallery from "../components/Post/Gallery"
import useHttp from "../hooks/http.hook"
import useParser from "../hooks/parser.hook"
import useGallery from "../hooks/gallery.hook"
import {GET} from "../api"



const PostPage = () => {

  const [post, setPost] = useState(null)
  const history = useHistory()
  const {gallery, getGallery} = useGallery()
  const {id} = useParams()
  const {request} = useHttp()

  const getPost = useCallback(async () => {
    const data = await request(...GET("posts", id, {
      published: true,
      owner: "blog/posts",
    }))
    if (data) return setPost(data)
    history.push("/404")
  }, [id, request, history, setPost])

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
      <SEO
        title={useParser(post && post.title ? post.title : "")}
        description={useParser(post && post.description ? post.description : "")}
        keywords={useParser(post && post.keywords ? post.keywords : "")}
        image={gallery ? gallery[0][0] : null}
      />
      <section className="post-page">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-8 mb-5">
              <h1 className="h2 text-primary font-weight-light mb-3 mb-md-4">
                {useParser(post && post.longtitle)}
              </h1>
              {useParser(post && post.richtext)}
            </div>
            {post && <Gallery items={post.gallery}/>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PostPage