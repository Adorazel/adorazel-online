import React from "react"

const Error = ({error}) => {
  let digits = null
  switch (error) {
    case 401: {
      digits = <p className="code m-0">4<span>0</span><span>1</span></p>
      break
    }
    case 403: {
      digits = <p className="code m-0">4<span>0</span><span>3</span></p>
      break
    }
    case 404: {
      digits = <p className="code m-0">4<span>0</span><span>4</span></p>
      break
    }
    default:
      break
  }
  return (
    <div className="content-body position-relative">
      <div className="error-wrapper d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100">
        <p className="error">E<span>r</span>ror</p>
        {digits}
      </div>
    </div>
  )
}

export default Error