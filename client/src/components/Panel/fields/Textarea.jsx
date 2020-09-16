import React from "react"

const Textarea = ({name, label, value, changeHandler, disabled}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <textarea id={name} name={name} rows="3" className="form-control" value={value}
              onChange={changeHandler.bind(this)} disabled={disabled}/>
  </div>
)

export default Textarea