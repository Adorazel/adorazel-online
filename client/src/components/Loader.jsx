import React from "react"
import logo from "../img/logo.svg"

const Loader = ({className, imgStyle}) => (
  <div className={`position-relative ${className}`}>
    <div className="d-flex justify-content-center align-items-center position-absolute w-100 h-100">
      <img src={logo} alt="loader" width="370" height="220" style={{maxWidth: "50vw", ...imgStyle}}
           className="img-responsive animate__animated animate__pulse animate__infinite"/>
    </div>
  </div>
)

export default Loader
