import React from "react"

const Checkbox = ({name, label, checked, disabled, changeHandler}) => (
  <div className="form-check">
    <input type="checkbox" id={name} name={name} className="form-check-input"
           onChange={changeHandler.bind(this)} checked={checked} disabled={disabled}/>
    <label htmlFor={name} className="form-check-label">{label}</label>
  </div>
)

export default Checkbox