import React from "react"
import {Helmet} from "react-helmet"

const Error = ({error}) => {
  let digits, title
  switch (error) {
    case 404: {
      digits = <p className="code m-0">4<span>0</span><span>4</span></p>
      title = "Страница не найдена"
      break
    }
    default:
      break
  }
  return (
    <div className="content-body position-relative">
      <Helmet>
        <title>{`${title} | Adorazel Online`}</title>
      </Helmet>
      <div className="error-wrapper d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100">
        <p className="error">E<span>r</span>ror</p>
        {digits}
      </div>
    </div>
  )
}

export default Error