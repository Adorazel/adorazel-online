import React from "react"

const Email = ({name, label, value,  changeHandler, disabled}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input type="email" id={name} name={name} className="form-control" value={value} required
           onChange={changeHandler.bind(this)} disabled={disabled}/>
  </div>
)

export default Email