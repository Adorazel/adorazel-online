import React from "react"

const Number = ({name, label, value, min, max, disabled, changeHandler}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input type="number" id={name} name={name} className="form-control" min={min} max={max} value={value}
           onChange={changeHandler.bind(this)} disabled={disabled}/>
  </div>
)

export default Number