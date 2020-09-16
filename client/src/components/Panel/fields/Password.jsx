import React from "react"

const Password = ({name, label, value, minLength = 6, changeHandler, disabled}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input type="password" id={name} name={name} className="form-control" value={value} minLength={minLength} required
           onChange={changeHandler.bind(this)} disabled={disabled}/>
  </div>
)

export default Password