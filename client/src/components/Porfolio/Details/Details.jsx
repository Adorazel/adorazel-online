import React, {useRef} from "react"
import SimpleBar from "simplebar-react"
import {CSSTransition} from "react-transition-group"
import Loader from "../../Loader"
import SliceboxSlider from "../SliceboxSlider"
import useParser from "../../../hooks/parser.hook"


const noop = () => {
}

const Details = ({current, open, toggleHandler = noop}) => {


  const details = useRef()
  const title = useRef()
  const slider = useRef()

  return (<>
    {!current && <div className={`project-details${open ? " open" : ""}`}>
      <div className="project-details__header d-flex justify-content-end align-items-center">
        <button className="close-btn" onClick={toggleHandler.bind(this, null)}/>
      </div>
      <Loader className="h-100 w-100"/>
    </div>}
    <CSSTransition
      nodeRef={details}
      in={open}
      timeout={1000}
      classNames="project-details"
    >
      <div ref={details} className="project-details">
        <div className="project-details__header d-flex justify-content-end align-items-center">
          <CSSTransition
            nodeRef={title}
            in={open}
            timeout={800}
            classNames="title"
            mountOnEnter
            unmountOnExit
          >
            <h3 ref={title}
              className="h3 title text-uppercase text-primary font-weight-light m-0 pr-4 animate__animated animate__fast">
              {useParser(current && current.description)}
            </h3>
          </CSSTransition>
          <button className="close-btn" onClick={toggleHandler.bind(this, null)}/>
        </div>
        <CSSTransition
          nodeRef={slider}
          in={open}
          timeout={800}
          classNames="slider"
          mountOnEnter
          unmountOnExit
        >
          <div ref={slider} className="slider d-flex justify-content-center align-items-center animate__animated animate__fast">
            <SimpleBar  style={{overflowX: "hidden"}} className="w-100">
              <div className="container">
                {current && <SliceboxSlider className="mt-5 mb-0" items={current.gallery}/>}
                {current && <p className="text-center mt-n4 mb-5">
                  <a href={current.uri} className="btn btn-primary text-uppercase mt-3"
                     target="_blank" rel="noopener noreferrer" onClick={event => event.target.blur()}>
                    Посмотреть проект в сети
                  </a>
                </p>}
              </div>
            </SimpleBar>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  </>)
}

export default Details