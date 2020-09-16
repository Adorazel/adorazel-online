import React from "react"

const Text = ({name, label, value, changeHandler, disabled}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input type="text" id={name} name={name} className="form-control" value={value}
           onChange={changeHandler.bind(this)} disabled={disabled}/>
  </div>
)

export default Text