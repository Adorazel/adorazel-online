import React, {useContext, useEffect, useState} from "react"
import BlogSlider from "../components/Blog/BlogSlider"
import Posts from "../components/Blog/Posts"
import SettingsContext from "../context/SettingsContext"
import Helmet from "react-helmet"
import {stripTags} from "../utils"


const BlogPage = () => {

  const {blog_title} = useContext(SettingsContext)
  const [title, setTitle] = useState(null)

  useEffect(() => {
    blog_title && setTitle(`${stripTags(blog_title)} | Adorazel Online`)
  }, [blog_title])

  return (
    <div className="content-body">
      <Helmet>
        {title && <title>{title}</title>}
      </Helmet>
      <section className="blog-page">
        <h1 hidden>Блог</h1>
        <BlogSlider/>
        <Posts/>
      </section>
    </div>
  )
}

export default BlogPage

