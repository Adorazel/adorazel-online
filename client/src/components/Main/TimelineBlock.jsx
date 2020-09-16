import React from "react"
import InstagramFeed from "./InstagramFeed"
import BlogFeed from "./BlogFeed"
import FormBlock from "../FormBlock"

const TimelineBlock = () => (
  <section className="timeline-block">
    <div className="container">
      <div className="row mx-n4">
        <div className="col-12 col-md-6 col-lg-4 px-4">
          <div className="stroke-title">
            <h4 className="title h6">Лента Instagram</h4>
          </div>
          <InstagramFeed/>
        </div>
        <div className="col-12 col-md-6 col-lg-4 px-4">
          <div className="stroke-title">
            <h4 className="title h6">Последние заметки</h4>
          </div>
          <BlogFeed/>
        </div>
        <div className="col-12 col-lg-4 px-4">
          <div className="stroke-title">
            <h4 className="title h6">Напиши мне</h4>
          </div>
          <FormBlock/>
        </div>
      </div>
    </div>
  </section>
)

export default TimelineBlock
