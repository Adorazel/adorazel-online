import React, {useContext} from "react"
import SEO from "../components/SEO"
import BlogSlider from "../components/Blog/BlogSlider"
import Posts from "../components/Blog/Posts"
import SettingsContext from "../context/SettingsContext"


const BlogPage = () => {

  const {blog_title, blog_description, blog_keywords} = useContext(SettingsContext)

  return (
    <div className="content-body">
      <SEO
        title={blog_title}
        description={blog_description}
        keywords={blog_keywords}
      />
      <section className="blog-page">
        <h1 hidden>Блог</h1>
        <BlogSlider/>
        <Posts/>
      </section>
    </div>
  )
}

export default BlogPage

