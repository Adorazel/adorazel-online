import React from "react"

const Select = ({name, label, value, disabled, changeHandler, options}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name} className="custom-select" value={value} onChange={changeHandler.bind(this)}
            disabled={disabled}>
      {options.map(({value, label}, i) => <option key={`${name}_${i}`} value={value}>{label}</option>)}
    </select>
  </div>
)

export default Select